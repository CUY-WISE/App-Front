import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { DbService } from '../../service/db-service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-diagramas',
  imports: [CommonModule, MatCardModule, NgxEchartsModule],
  templateUrl: './diagramas.html',
  styleUrls: ['./diagramas.css']

})

export class Diagramas implements OnInit, AfterViewInit, OnDestroy {
  chartDistribucionRazas: EChartsOption = {};
  chartActivosInactivos: EChartsOption = {};
  chartEvolucionPeso: EChartsOption = {};
  chartEventosTipo: EChartsOption = {};
  chartMedicionesAnimal: EChartsOption = {};
  chartAnimalesMes: EChartsOption = {};
  chartRelacionPesoFecha: EChartsOption = {};
  chartPromedioPesoRaza: EChartsOption = {};

  isBrowser = false;

  constructor(
    private db: DbService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.db.getDistribucionRazas().subscribe(data => {
      this.chartDistribucionRazas = {
        color: ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          top: 'bottom',
          textStyle: {
            color: '#444',
            fontSize: 12
          }
        },
        series: [{
          name: 'Distribución por Raza',
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333'
            }
          },
          labelLine: { show: false },
          data: data.map(d => ({ name: d.raza, value: +d.cantidad }))
        }]
      };
    });

    this.db.getAnimalesActivosInactivos().subscribe(data => {
      this.chartActivosInactivos = {
        color: ['#4E79A7', '#E15759'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [{
          name: 'Estado',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333'
            }
          },
          labelLine: { show: false },
          data: data.map(d => ({
            name: d.activo ? 'Activo' : 'Inactivo',
            value: +d.cantidad
          }))
        }]
      };
    });

    this.db.getEvolucionPesoPorAnimal().subscribe(data => {
      this.chartEvolucionPeso = {
        color: ['#4E79A7'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: (params: any) => {
            const p = Array.isArray(params) ? params[0] : params;
            const date = new Date(p.value[0]);
            return `${date.toLocaleDateString()}<br/>Peso: ${p.value[1]} kg`;
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            dataZoom: {},
            restore: {}
          }
        },
        xAxis: {
          type: 'time',
          axisLine: { lineStyle: { color: '#aaa' } },
          axisLabel: {
            formatter: value => new Date(value).toLocaleDateString()
          }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#aaa' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          name: 'Peso',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.08 },
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3 },
          data: data.map(d => [d.fecha_medicion, +d.peso])
        }]
      };
    });

    this.db.getEventosPorTipo().subscribe(data => {
      this.chartEventosTipo = {
        color: ['#4E79A7'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) => {
            const p = Array.isArray(params) ? params[0] : params;
            return `${p.name}<br/>Cantidad: ${p.value}`;
          }
        },
        toolbox: { feature: { saveAsImage: {}, restore: {} } },
        xAxis: {
          type: 'category',
          data: data.map(d => d.tipo_evento),
          axisLine: { lineStyle: { color: '#888' } },
          axisLabel: { rotate: 15, fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          type: 'bar',
          data: data.map(d => +d.cantidad),
          barWidth: '50%',
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }],
        animationDuration: 800
      };
    });

    this.db.getMedicionesPorAnimal().subscribe(data => {
      this.chartMedicionesAnimal = {
        color: ['#a8e89e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) => {
            const p = Array.isArray(params) ? params[0] : params;
            return `Animal ${p.name}<br/>Mediciones: ${p.value}`;
          }
        },
        toolbox: { feature: { saveAsImage: {}, restore: {} } },
        xAxis: {
          type: 'category',
          data: data.map(d => 'Animal ' + d.animal_id),
          axisLine: { lineStyle: { color: '#888' } },
          axisLabel: { fontSize: 12, rotate: 15 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          type: 'bar',
          data: data.map(d => +d.cantidad),
          barWidth: '55%',
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }],
        animationDuration: 800
      };
    });

    this.db.getAnimalesPorMesAnio().subscribe(data => {
      this.chartAnimalesMes = {
        color: ['#F28E2B'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'line' },
          formatter: (params: any) => {
            const p = Array.isArray(params) ? params[0] : params;
            return `${p.name}<br/>Animales registrados: ${p.value}`;
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataZoom: {}
          }
        },
        xAxis: {
          type: 'category',
          data: data.map(d => d.mes_anio),
          axisLine: { lineStyle: { color: '#888' } },
          axisLabel: { fontSize: 12, rotate: 25 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          name: 'Registros',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.1 },
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 3 },
          data: data.map(d => +d.cantidad)
        }],
        animationDuration: 900
      };
    });

    this.db.getRelacionPesoFecha().subscribe(data => {
      this.chartRelacionPesoFecha = {
        color: ['#A0CBE8'],
        tooltip: {
          trigger: 'item',
          formatter: (param: any) => {
            const date = new Date(param.data[0]).toLocaleDateString();
            return `Fecha: ${date}<br/>Peso: ${param.data[1]} kg`;
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataZoom: {}
          }
        },
        xAxis: {
          type: 'time',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } },
          axisLabel: { fontSize: 12 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          type: 'scatter',
          symbolSize: 8,
          data: data.map(d => [d.fecha_medicion, +d.peso]),
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1.5
            }
          }
        }],
        animationDuration: 700
      };
    });

    this.db.getPromedioPesoPorRaza().subscribe(data => {
      this.chartPromedioPesoRaza = {
        color: ['#8CD17D'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: any) => {
            const p = Array.isArray(params) ? params[0] : params;
            return `${p.name}<br/>Peso promedio: ${p.value} kg`;
          }
        },
        toolbox: { feature: { saveAsImage: {}, restore: {} } },
        xAxis: {
          type: 'category',
          data: data.map(d => d.raza),
          axisLine: { lineStyle: { color: '#888' } },
          axisLabel: { fontSize: 12, rotate: 20 }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#888' } },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          type: 'bar',
          data: data.map(d => +d.peso_promedio),
          barWidth: '50%',
          itemStyle: { borderRadius: [4, 4, 0, 0] }
        }],
        animationDuration: 800
      };
    });
  }

  // === RESPONSIVE SUPPORT ===
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', this.resizeCharts);
    }
  }

  resizeCharts = () => {
    const chartElements = document.querySelectorAll('[echarts]');
    chartElements.forEach(el => {
      const instance = echarts.getInstanceByDom(el as HTMLElement);
      if (instance) instance.resize();
    });
  };

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.resizeCharts);
    }
  }
}