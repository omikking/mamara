import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModelOverviewComponent } from '../../image_detection_AI/overview/overview';
import { Versions } from '../../image_detection_AI/versions/versions';
import { ToggleModal } from '../../components/toggle-modal/toggle-modal';
import { Overviewservice } from '../../services/overviewservice';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';
import * as d3 from 'd3';

echarts.use([
  BarChart, 
  GridComponent, 
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  LineChart
]);

@Component({
  selector: 'app-image-detection-ai',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    ModelOverviewComponent,
    Versions,
    ToggleModal,
    NgxEchartsDirective
  ],
  templateUrl: './image-detection-ai.html',
  styleUrl: './image-detection-ai.css',
  providers: [provideEchartsCore({ echarts })],
})
export class ImageDetectionAI {
  imagedetection = inject(Overviewservice);

  setActiveView(section: string) {
    this.imagedetection.activeView = section;
    console.log(this.imagedetection.activeView);

    if (section === 'dataset') {
    setTimeout(() => {
      this.drawTravelPath();
    }, 100); // Give Angular time to render the SVG
  }
  }

  chartOption: echarts.EChartsCoreOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  };

  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions(): EChartsOption {
    return {
      title: {
        text: 'Movement Tracking - Floor Plan Overlay',
        subtext: 'Tracking Trajectories Over Time',
        left: 'center',
        top: '1%'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const data = params.data as [number, number];
          return `<strong>${params.seriesName}</strong><br/>` +
                 `X: ${data[0].toFixed(1)}<br/>` +
                 `Y: ${data[1].toFixed(1)}`;
        }
      },
      xAxis: {
        min: 0, 
        max: 100, 
        type: 'value',
        show: false
      },
      yAxis: {
        min: 0, 
        max: 100, 
        type: 'value',
        show: false
      },
      grid: {
        left: '15%',
  right: '15%',
  top: '15%',
  bottom: '15%',
        containLabel: false
      },
      graphic: [
        // Top-left quadrant (25% width, 50% height)
        {
          type: 'rect',
          z: 1,
          left: '0%',
          top: '11%',
          
          shape: {
            x: 40, y: 40, width: 20, height: 20
          },
          style: { 
            fill: 'rgba(173, 216, 230, 0.5)', 
            stroke: '#1E90FF', 
            lineWidth: 3 
          }
        },
        {
          type: 'text',
          z: 2,
          left: '12.5%',
          top: '31%',
          style: { 
            text: 'Zone 1: Entry\n(25% x 50%)', 
            fill: '#1E90FF',
            font: 'bold 12px sans-serif',
            align: 'center'
          }
        },
        
        // Top-right quadrant (25% width, 50% height)
        {
          type: 'rect',
          z: 1,
          left: '25%',
          top: '6%',
          
          shape: {
            width: '25%',
          height: '50%',
          },
          style: { 
            fill: 'rgba(200, 200, 200, 0.5)', 
            stroke: '#909090', 
            lineWidth: 3 
          }
        },
        {
          type: 'text',
          z: 2,
          left: '37.5%',
          top: '31%',
          style: { 
            text: 'Zone 2: Corridor\n(25% x 50%)', 
            fill: '#606060',
            font: 'bold 12px sans-serif',
            align: 'center'
          }
        },

        // Middle-right area (50% width, 50% height)
        {
          type: 'rect',
          z: 1,
          left: '50%',
          top: '6%',
          
          shape: {
            width: '50%',
          height: '50%',
          },
          style: { 
            fill: 'rgba(144, 238, 144, 0.5)', 
            stroke: '#3CB371', 
            lineWidth: 3 
          }
        },
        {
          type: 'text',
          z: 2,
          left: '75%',
          top: '31%',
          style: { 
            text: 'Zone 3: Room A\n(50% x 50%)', 
            fill: '#3CB371',
            font: 'bold 12px sans-serif',
            align: 'center'
          }
        },

        // Bottom half (100% width, 50% height)
        {
          type: 'rect',
          z: 1,
          left: '0%',
          top: '56%',
          
          shape: {
            width: '100%',
          height: '44%',
          },
          style: { 
            fill: 'rgba(255, 160, 122, 0.5)', 
            stroke: '#FF6347', 
            lineWidth: 3 
          }
        },
        {
          type: 'text',
          z: 2,
          left: '50%',
          top: '78%',
          style: { 
            text: 'Zone 4: Room B (100% x 44%)', 
            fill: '#FF6347',
            font: 'bold 12px sans-serif',
            align: 'center'
          }
        }
      ],
      series: [
        // Blue trajectory - leftmost vertical path
        {
          name: 'Person A (Blue)',
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          smooth: true,
          lineStyle: {
            color: '#4169E1',
            width: 2.5
          },
          itemStyle: {
            color: '#4169E1'
          },
          data: [
            [15, 20],
            [15, 28],
            [15, 36],
            [15, 44],
            [15, 52],
            [15, 60],
            [15, 68],
            [15, 76],
            [15, 82],
            [16, 87],
            [17, 90]
          ],
        },
        // Black trajectory - middle path
        {
          name: 'Person B (Black)',
          type: 'line',
          symbol: 'triangle',
          symbolSize: 5,
          smooth: true,
          lineStyle: {
            color: '#000000',
            width: 2.5
          },
          itemStyle: {
            color: '#000000'
          },
          data: [
            [18, 22],
            [18, 30],
            [18, 38],
            [18, 46],
            [18, 54],
            [18, 60],
            [18, 65],
            [18, 68],
            [18, 70],
            [18, 71],
            [18, 72]
          ],
        },
        // Yellow/Green trajectory - rightmost path
        {
          name: 'Person C (Yellow)',
          type: 'line',
          symbol: 'diamond',
          symbolSize: 5,
          smooth: true,
          lineStyle: {
            color: '#9ACD32',
            width: 2.5
          },
          itemStyle: {
            color: '#9ACD32'
          },
          data: [
            [20, 24],
            [20, 32],
            [20, 40],
            [20, 48],
            [20, 55],
            [20, 61],
            [20, 66],
            [20, 69],
            [20, 71],
            [20, 72],
            [20, 73]
          ],
        },
      ],
    };
  }
  // Get a reference to the SVG element in the template
  @ViewChild('travelSvg', { static: false }) 
  private svgContainer!: ElementRef;
  
  // Data for the travel path (x, y coordinates)
  private travelData = [
    { x: 50, y: 450 },     // Start
    { x: 200, y: 100 },    // Stop 1
    { x: 500, y: 350 },    // Stop 2
    { x: 750, y: 50 }      // End
  ];
  
  // Dimensions for the visualization (should match container/image size)
  private width = 800;
  private height = 300;

  constructor() { }

  

  private drawTravelPath(): void {

    if (!this.svgContainer?.nativeElement) {
      console.error('SVG container not available');
      return;
    }
    // 1. Select the SVG element using the native element reference
    const svg = d3.select(this.svgContainer.nativeElement)
        .attr("viewBox", `0 0 ${this.width} ${this.height}`);

    // 2. Define the line generator function
    const lineGenerator = d3.line<any>()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveCardinal); // Smooth curve

    // 3. Draw the path
    const path = svg.append("path")
        .datum(this.travelData) // Bind the data
        .attr("fill", "none")
        .attr("stroke", "orange") // Changed color for visibility
        .attr("stroke-width", 5)
        .attr("d", lineGenerator);

    // 4. (Optional) Add Animation (Stroke Dash Array Trick)
    // Get the total length of the path
    const totalLength = (path.node() as SVGPathElement).getTotalLength();

    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength) // Start completely hidden
        .transition() // Start a D3 transition
        .duration(3000) // 3 seconds to draw
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0); // End fully visible

    // 5. (Optional) Add circles for the stops
    svg.selectAll(".point")
        .data(this.travelData)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 8) 
        .attr("fill", "red")
        .attr("opacity", 0) // Start hidden
        .transition()
        .delay((d, i) => 1000 + i * 500) // Delay the appearance of each point
        .duration(500)
        .attr("opacity", 1);
  }
}
