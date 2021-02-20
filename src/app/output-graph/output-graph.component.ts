import { Component, OnInit } from '@angular/core';
import * as HC_stock from "highcharts/highstock"
declare var require: any;
import { HttpClient } from '@angular/common/http';
import { Generation } from '../classes/generation';
import { Outage } from '../classes/outage';
import { Price } from '../classes/price';
import { TotalLoad } from '../classes/total-load';
import { PriceService } from '../services/price.service';
import { PredPriceService } from '../services/pred-price.service';
import { Import } from '../classes/import'
@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  series: any = [{
    pointStart: Date.UTC(2015, 0, 1)
  }];
  series1: any = []; 1
  public options: any = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    time: {
      useUTC: false
    },
    series: this.series
  }
  public options1: any = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    time: {
      useUTC: false
    },
    series: this.series1
  }
  setSeries() {
    var ser = true;
    var ser1 = false;
    // for (let i = 2; i < this.GenerationForecastGraph.length - 1; i++) {
    //   if (this.GenerationForecastGraph[i] == undefined || this.solarForecastGraph[i] == undefined || this.windForecastGraph[i] == undefined) continue;
    //   this.thermalHydroForecastGraph.push([this.GenerationForecastGraph[i][0],
    //   this.GenerationForecastGraph[i][1] - this.solarForecastGraph[i][1] - this.windForecastGraph[i][1]]);
    // }
    // this.thermalHydroForecastGraph.shift()
    // this.thermalHydroForecastGraph.shift()
    // console.log(this.GenerationForecastArray[2], new Date(this.GenerationForecastGraph[2][0]), this.GenerationForecastGraph[2][1])
    if (ser) {
      if (this.outageBool) {
        this.series.push({ name: "Outages", data: this.OutagesGraph, color: 'brown' });
        this.outageBool = !this.outageBool;
      }
      if (this.availabilityBool) {
        this.series.push({ name: "Available", data: this.AvailabilityGraph, color: 'green' });
        this.availabilityBool = !this.availabilityBool;
      }
      if (this.priceBool) {
        this.series.push({ name: "Actual Price", data: this.PriceGraph, color: 'gray' });
        this.priceBool = !this.priceBool;
      }
      if (this.importBool) {
        this.series.push({ name: "Imports", data: this.ImportGraph, color: 'cyan' });
        this.importBool = !this.importBool;
      }
      if (this.aFRRbalancingPriceBool) {
        this.series.push({ name: "aFRR Balancing Price Up", data: this.aFRRBalancingPriceUpGraph, color: 'green' });
        this.series.push({ name: "aFRR Balancing Price Down", data: this.aFRRBalancingPriceDownGraph, color: 'red' });
        this.aFRRbalancingPriceBool = !this.aFRRbalancingPriceBool;
      }
      if (this.mFRRbalancingPriceBool) {
        this.series.push({ name: "mFRR Balancing Price Up", data: this.mFRRBalancingPriceUpGraph, color: 'green' });
        this.series.push({ name: "mFRR Balancing Price Down", data: this.mFRRBalancingPriceDownGraph, color: 'red' });
        this.mFRRbalancingPriceBool = !this.mFRRbalancingPriceBool;
      }
      if (this.RRbalancingPriceBool) {
        this.series.push({ name: "RR Balancing Price Up", data: this.RRBalancingPriceUpGraph, color: 'green' });
        this.series.push({ name: "RR Balancing Price Down", data: this.RRBalancingPriceDownGraph, color: 'red' });
        this.RRbalancingPriceBool = !this.RRbalancingPriceBool;
      }
      if (this.FCRbalancingPriceBool) {
        this.series.push({ name: "FCR Balancing Price Up", data: this.FCRBalancingPriceUpGraph, color: 'green' });
        this.series.push({ name: "FCR Balancing Price Down", data: this.FCRBalancingPriceDownGraph, color: 'red' });
        this.FCRbalancingPriceBool = !this.FCRbalancingPriceBool;
      }
      if (this.predPriceBool) {
        this.series.push({ name: "Predicted Price", data: this.PredPriceGraph, color: 'red' });
        this.predPriceBool = !this.predPriceBool;
      }
      if (this.windBool) {
        this.windBool = !this.windBool;
        this.series.push({ name: "Wind", data: this.windGraph, color: 'blue' });
      }
      if (this.solarBool) {
        this.solarBool = !this.solarBool;
        this.series.push({ name: "Solar", data: this.solarGraph, color: 'orange' });
      }
      if (this.thermalBool) {
        this.thermalBool = !this.thermalBool;
        this.series.push({ name: "Thermal", data: this.thermalGraph, color: 'red' });
      }
      if (this.hydroBool) {
        this.hydroBool = !this.hydroBool;
        this.series.push({ name: "Hydro", data: this.hydroGraph, color: 'cyan' });
      }
      if (this.totalLoadBool) {
        this.totalLoadBool = !this.totalLoadBool;
        this.series.push({ name: "Total Load", data: this.TotalLoadGraph, color: 'black' });
      }
      if (this.totalLoadForecastBool) {
        this.totalLoadForecastBool = !this.totalLoadForecastBool;
        this.series.push({ name: "Total Load Forecast", data: this.TotalLoadForecastGraph, color: 'black', dashStyle: 'ShortDash' });
      }
      if (this.windForecastBool) {
        this.windForecastBool = !this.windForecastBool;
        this.series.push({ name: "Wind Forecast", data: this.windForecastGraph, color: 'blue', dashStyle: 'ShortDash' });
      }
      if (this.generationBool) {
        this.generationBool = !this.generationBool;
        this.series.push({ name: "Total Generation", data: this.GenerationGraph, color: 'purple' });
      }
      if (this.solarForecastBool) {
        this.solarForecastBool = !this.solarForecastBool
        this.series.push({ name: "Solar Forecast", data: this.solarForecastGraph, color: 'orange', dashStyle: 'ShortDash' });
      }
      if (this.generationForecastBool) {
        this.generationForecastBool = !this.generationForecastBool;
        this.series.push({ name: "Total Production Forecast", data: this.GenerationForecastGraph, color: 'purple', dashStyle: 'ShortDash' });
      }
      if (this.generationSWForecastBool) {
      }
      if (this.thermalHydroForecastBool) {
        this.thermalHydroForecastBool = !this.thermalHydroForecastBool;
        this.series1.push({ name: "Thermal-Hydro Forecast", data: this.thermalHydroForecastGraph, color: 'red', dashStyle: 'ShortDash' });
      }
    }
    // if (ser1) {
    //   this.series1.push({ name: "Solar", data: this.solarGraph, color: 'orange' });
    //   this.series1.push({ name: "Wind", data: this.windGraph, color: 'blue' });
    //   this.series1.push({ name: "Total Production Forecast", data: this.GenerationForecastGraph, color: 'purple', dashStyle: 'ShortDash' });
    //   // this.series1.push({ name: "Actual Total Load", data: this.TotalLoadGraph, color: 'black' });
    //   // this.series1.push({ name: "Total Load Forecast", data: this.TotalLoadForecastGraph, color: 'black', dashStyle: 'ShortDash' });
    // }

    this.options.series = this.series;
    this.options1.series = this.series1;
  }
  countries: string[] = ["at", "be", "fr", "it", "nl", "se1", "se2", "se3", "se4", "sk"];
  countryClicked = [];
  outageBool: boolean = false;
  totalLoadBool: boolean = false;
  totalLoadForecastBool: boolean = false;
  generationBool: boolean = false;
  generationSWForecastBool: boolean = false;
  generationForecastBool: boolean = false;
  solarBool: boolean = false;
  windBool: boolean = false;
  hydroBool: boolean = false;
  thermalBool: boolean = false;
  hydroForecastBool: boolean = false;
  thermalForecastBool: boolean = false;
  solarForecastBool: boolean = false;
  windForecastBool: boolean = false;
  thermalHydroForecastBool: boolean = false;
  availabilityBool: boolean = false;
  priceBool: boolean = false;
  predPriceBool: boolean = false;
  aFRRbalancingPriceBool: boolean = false;
  mFRRbalancingPriceBool: boolean = false;
  RRbalancingPriceBool: boolean = false;
  FCRbalancingPriceBool: boolean = false;
  importBool: boolean = false;
  TotalLoadForecastGraph: number[][] = [[], []];
  TotalLoadGraph: number[][] = [[], []];
  GenerationGraph: number[][] = [[], []];
  GenerationSWForecastGraph: number[][] = [[], []];
  GenerationForecastGraph: number[][] = [[], []];
  solarGraph: number[][] = [[], []];
  windGraph: number[][] = [[], []];
  hydroGraph: number[][] = [[], []];
  thermalGraph: number[][] = [[], []];
  hydroForecastGraph: number[][] = [[], []];
  thermalForecastGraph: number[][] = [[], []];
  solarForecastGraph: number[][] = [[], []];
  windForecastGraph: number[][] = [[], []];
  thermalHydroForecastGraph: number[][] = [[], []];
  OutagesGraph: number[][] = [[], []];
  AvailabilityGraph: number[][] = [[], []];
  PriceGraph: number[][] = [[], []];
  aFRRBalancingPriceUpGraph: number[][] = [];
  aFRRBalancingPriceDownGraph: number[][] = [];
  mFRRBalancingPriceUpGraph: number[][] = [];
  mFRRBalancingPriceDownGraph: number[][] = [];
  RRBalancingPriceUpGraph: number[][] = [];
  RRBalancingPriceDownGraph: number[][] = [];
  FCRBalancingPriceUpGraph: number[][] = [];
  FCRBalancingPriceDownGraph: number[][] = [];
  ImportGraph: number[][] = [];
  PredPriceGraph: number[][] = [[], []];
  // dummy: number[][] = [[], []];
  PriceArray: Price[] = [];
  importArray: Import[] = []
  aFRRBalancingPriceUpArray: Price[] = [];
  aFRRBalancingPriceDownArray: Price[] = [];
  mFRRBalancingPriceUpArray: Price[] = [];
  mFRRBalancingPriceDownArray: Price[] = [];
  RRBalancingPriceUpArray: Price[] = [];
  RRBalancingPriceDownArray: Price[] = [];
  FCRBalancingPriceUpArray: Price[] = [];
  FCRBalancingPriceDownArray: Price[] = [];
  PredPriceArray: Price[] = [];
  OutageArray: Outage[] = [];
  TotalLoadArray: TotalLoad[] = [];
  TotalLoadForecastArray: TotalLoad[] = [];
  GenerationArray: Generation[] = [];
  GenerationSWForecastArray: Generation[] = [];
  GenerationForecastArray: Generation[] = [];
  AvailabilityArray: Generation[] = [];
  constructor(private http: HttpClient, private priceService: PriceService, private predPriceService: PredPriceService) { };

  createTotalLoadGraph(array: TotalLoad[], graph: number[][]) {
    for (let tl of array) {
      graph.push([tl.DateTime.getTime(), parseFloat(tl.TotalLoadValue.toFixed(2))]);
    }
    graph.shift();
    graph.shift();
    return graph;

  }
  createPriceGraph(array: Price[], graph: number[][]) {
    let i = 0;
    for (let tl of array) {
      if (parseFloat(tl.Price.toFixed(2)) != 0) {
        if(i>101001-15) console.log(tl.Price, tl.DateTime)
        i++;
      }
      graph.push([tl.DateTime.getTime(), parseFloat(tl.Price.toFixed(2))]);
    }
    graph.shift();
    graph.shift();
    console.log(i)
    return graph;

  }
  createOutageGraph(array: Outage[]) {
    var startDate = new Date("2015-01-01 00:00.000");
    var endDate = new Date("2021-01-01 00:00.000");
    for (let i = startDate.getTime(); i <= endDate.getTime(); i += 3600000) {
      this.OutagesGraph.push([i, 0]);
    }
    let k = 0
    for (let out of array) {
      for (let i = 2; i <= this.OutagesGraph.length - 1; i++) {
        if (this.OutagesGraph[i][0] == ~~(out.StartTS.getTime() / 3600000) * 3600000) {
          while (this.OutagesGraph[i][0] <= ~~(out.EndTS.getTime() / 3600000) * 3600000) {
            this.OutagesGraph[i][1] += out.UnavailabilityValue;
            i++;
          }
          break;
        }
      }
    }
    this.OutagesGraph.shift();
    this.OutagesGraph.shift();
  }
  createAvailabilityGraph(array: Generation[]) {
    let startingYear = array[0].Year;
    let capByYear = [0, 0, 0, 0, 0, 0];
    for (let instCap of array) {
      capByYear[instCap.Year - startingYear] += instCap.ActualGenerationOutput;
    }
    console.log(capByYear, startingYear)
    for (let i = 2; i <= this.OutagesGraph.length - 1; i++) {
      if (this.OutagesGraph[i][0] < new Date("2016-01-01 00:00.000").getTime()) {
        if (startingYear <= 2015) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[0] - this.OutagesGraph[i][1]]);
        }
      }
      else if (this.OutagesGraph[i][0] < new Date("2017-01-01 00:00.000").getTime()) {
        if (startingYear <= 2016) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[1] - this.OutagesGraph[i][1]]);
        }
      }
      else if (this.OutagesGraph[i][0] < new Date("2018-01-01 00:00.000").getTime()) {
        if (startingYear <= 2017) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[2] - this.OutagesGraph[i][1]]);
        }
      }
      else if (this.OutagesGraph[i][0] < new Date("2019-01-01 00:00.000").getTime()) {
        if (startingYear <= 2018) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[0] - this.OutagesGraph[i][1]]);
        }
      }
      else if (this.OutagesGraph[i][0] < new Date("2020-01-01 00:00.000").getTime()) {
        if (startingYear <= 2019) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[0] - this.OutagesGraph[i][1]]);
        }
      }
      else if (this.OutagesGraph[i][0] < new Date("2021-01-01 00:00.000").getTime()) {
        if (startingYear <= 2020) {
          this.AvailabilityGraph.push([this.OutagesGraph[i][0], capByYear[0] - this.OutagesGraph[i][1]]);
        }
      }
    }
    this.AvailabilityGraph.shift()
    this.AvailabilityGraph.shift()
  }
  createImportGraph(array: Import[], graph: number[][]) {
    let index: number = 0;
    let prevRow: Import;
    let sum: number = 0;
    for(let imp of array){
      if (index == 0 ){
        index++;
        prevRow = imp;
        sum += imp.Capacity;
        continue;
      }
      if(prevRow.DateTime.getTime() == imp.DateTime.getTime()){
        sum+= imp.Capacity;
      }
      else{
        graph.push([prevRow.DateTime.getTime(), parseFloat(sum.toFixed(2))])
        sum = imp.Capacity;
        prevRow = imp;
      }
    }
    console.log("after for")
    graph.shift();
    graph.shift();
    return graph;
  }
  createGenerationGraph(array: Generation[], graph: number[][], sol: number[][], w: number[][], hyd: number[][], th: number[][]) {
    let wholeHour: number = 0;
    let index: number = 0;
    let solar: number = 0;
    let wind: number = 0;
    let hydro: number = 0;
    let thermal: number = 0;
    let prevRow: Generation;
    for (let tl of array) {
      if (index == 0) {
        index++;
        prevRow = tl;
        wholeHour += tl.ActualGenerationOutput
        continue;
      }
      if (prevRow.DateTime.getTime() == tl.DateTime.getTime()) {
        wholeHour += tl.ActualGenerationOutput;
        if (tl.ProductionType.includes("Solar")) {
          solar += tl.ActualGenerationOutput;
        }
        else if (tl.ProductionType.includes("Hydro")) {
          hydro += tl.ActualGenerationOutput;
        }
        else if (tl.ProductionType.includes("Wind")) {
          wind += tl.ActualGenerationOutput;
        }
        else thermal += tl.ActualGenerationOutput;
        continue;
      }
      else {
        //the commented lines are  for Greek data bexause of null values during july '16 and may '20
        // if ((prevRow.Year == 2016 && prevRow.Month == 7) || (prevRow.Year == 2020 && prevRow.Month == 5)) {
        //   wholeHour /= 2;
        //   solar /= 2;
        //   wind /= 2;
        //   hydro /= 2;
        //   thermal /= 2;
        // }
        graph.push([prevRow.DateTime.getTime(), parseFloat(wholeHour.toFixed(2))]);
        sol.push([prevRow.DateTime.getTime(), parseFloat(solar.toFixed(2))]);
        w.push([prevRow.DateTime.getTime(), parseFloat(wind.toFixed(2))]);
        hyd.push([prevRow.DateTime.getTime(), parseFloat(hydro.toFixed(2))]);
        th.push([prevRow.DateTime.getTime(), parseFloat(thermal.toFixed(2))]);
        solar = 0;
        wind = 0;
        hydro = 0;
        thermal = 0;
        if (tl.ProductionType.includes("Solar")) {
          solar = tl.ActualGenerationOutput;
        }
        else if (tl.ProductionType.includes("Hydro")) {
          hydro = tl.ActualGenerationOutput;
        }
        else if (tl.ProductionType.includes("Wind")) {
          wind = tl.ActualGenerationOutput;
        }
        else thermal = tl.ActualGenerationOutput;
        wholeHour = tl.ActualGenerationOutput;
        prevRow = tl
      }
    }
    this.GenerationGraph.shift();
    this.GenerationGraph.shift();
    this.windGraph.shift();
    this.windGraph.shift();
    this.hydroGraph.shift();
    this.hydroGraph.shift();
    this.solarGraph.shift();
    this.solarGraph.shift();
    this.thermalGraph.shift();
    this.thermalGraph.shift();
  }
  createGenerationForecastGraph(array: any[], graph: number[][]) {
    for (let tl of array) {
      graph.push([tl.DateTime.getTime(), parseFloat(tl.ActualGenerationOutput.toFixed(2))]);
    }
    graph.shift();
    graph.shift();
    return graph;
  }
  ngOnInit() {
    this.countries.map(country => {
      this.countryClicked[country] = false;
    })
    // if (this.outageBool) {
    //   this.http.get('../assets/Europe_Outages/BEOutagesData.csv', { responseType: 'text' })
    //     .subscribe(data => {
    //       let csvToRowArray = data.split("\n");
    //       for (let index = 1; index < csvToRowArray.length - 1; index++) {
    //         let row = csvToRowArray[index].split(",");
    //         this.OutageArray.push(new Outage(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]), new Date(row[5]), row[6],
    //           row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14],
    //           row[15], row[16], parseInt(row[17]), parseFloat(row[18]), parseInt(row[19]), row[20], row[21]));
    //       }
    //       this.createOutageGraph(this.OutageArray);
    //       this.setSeries();
    //       HC_stock.stockChart('container', this.options);
    //       // HC_stock.stockChart('container1', this.options1);
    //     },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    // }
  }

  countryBtnClicked(event: Event) {
    let id = (event.target as Element).id
    this.countries.map(country => {
      this.countryClicked[country] = false;
    })
    this.countryClicked[id] = true;
  }
  checkCountryClicked(): string {
    let returnCountry: string = ""
    this.countries.map((value) => {
      console.log(value, this.countryClicked[value])
      if (this.countryClicked[value]) {
        console.log(value)
        returnCountry = value;
      }
    })
    if (returnCountry == "") {
      alert('Please select a Mapcode before you select a chart!')
    }
    return returnCountry;
  }
  showOutages($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get('../assets/Europe_Outages/BEOutagesData.csv', { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.OutageArray.push(new Outage(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]), new Date(row[5]), row[6],
            row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14],
            row[15], row[16], parseInt(row[17]), parseFloat(parseFloat(row[18]).toFixed(2)), parseInt(row[19]), row[20], row[21]));
        }
        this.createOutageGraph(this.OutageArray);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.outageBool = !this.outageBool;
  }
  showImports($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}Imports.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.importArray.push(new Import(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], parseFloat(row[14]), row[15]));
        }
        console.log("imports")
        this.ImportGraph = this.createImportGraph(this.importArray, this.ImportGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
      this.importBool = !this.importBool;
  }
  showAvailability($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get('../assets/Installed_Capacity/BEInstalledCapacity.csv', { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.AvailabilityArray.push(new Generation(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], row[10], parseFloat(row[11]), row[13]));
        }
        this.createAvailabilityGraph(this.AvailabilityArray);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.availabilityBool = !this.availabilityBool;
  }
  show_aFRRBalancingPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/aFRR/${country.toUpperCase()}ActivatedBalancingPrices_aFRR.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.aFRRBalancingPriceUpArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[15]), row[18], row[19]));
          this.aFRRBalancingPriceDownArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[16]), row[18], row[19]));
        }
        this.aFRRBalancingPriceUpGraph = this.createPriceGraph(this.aFRRBalancingPriceUpArray, this.aFRRBalancingPriceUpGraph);
        this.aFRRBalancingPriceDownGraph = this.createPriceGraph(this.aFRRBalancingPriceDownArray, this.aFRRBalancingPriceDownGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.aFRRbalancingPriceBool = !this.aFRRbalancingPriceBool;
  }
  show_RRBalancingPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/RR/${country.toUpperCase()}ActivatedBalancingPrices_RR.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.RRBalancingPriceUpArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[15]), row[18], row[19]));
          this.RRBalancingPriceDownArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[16]), row[18], row[19]));
        }
        this.RRBalancingPriceUpGraph = this.createPriceGraph(this.RRBalancingPriceUpArray, this.RRBalancingPriceUpGraph);
        this.RRBalancingPriceDownGraph = this.createPriceGraph(this.RRBalancingPriceDownArray, this.RRBalancingPriceDownGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.RRbalancingPriceBool = !this.RRbalancingPriceBool;
  }
  show_FCRBalancingPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/FCR/${country.toUpperCase()}ActivatedBalancingPrices_FCR.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.FCRBalancingPriceUpArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[15]), row[18], row[19]));
          this.FCRBalancingPriceDownArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[16]), row[18], row[19]));
        }
        this.FCRBalancingPriceUpGraph = this.createPriceGraph(this.FCRBalancingPriceUpArray, this.FCRBalancingPriceUpGraph);
        this.FCRBalancingPriceDownGraph = this.createPriceGraph(this.FCRBalancingPriceDownArray, this.FCRBalancingPriceDownGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.FCRbalancingPriceBool = !this.FCRbalancingPriceBool;
  }
  show_mFRRBalancingPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/mFRR/${country.toUpperCase()}ActivatedBalancingPrices_mFRR.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.mFRRBalancingPriceUpArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[15]), row[18], row[19]));
          this.mFRRBalancingPriceDownArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[16]), row[18], row[19]));
        }
        this.mFRRBalancingPriceUpGraph = this.createPriceGraph(this.mFRRBalancingPriceUpArray, this.mFRRBalancingPriceUpGraph);
        this.mFRRBalancingPriceDownGraph = this.createPriceGraph(this.mFRRBalancingPriceDownArray, this.mFRRBalancingPriceDownGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.mFRRbalancingPriceBool = !this.mFRRbalancingPriceBool;
  }
  showSolar($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.solarBool = !this.solarBool;
    this.showGeneration($event);
    this.generationBool = !this.generationBool;
  }
  showSolarForecast($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.solarForecastBool = !this.solarForecastBool;
    this.http.get(`../assets/${country.toUpperCase()}GenerationSolarWindForecastData.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.GenerationSWForecastArray.push(new Generation(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], row[10], parseFloat(row[11]), row[12]));
        }
        this.createGenerationGraph(this.GenerationSWForecastArray, this.GenerationSWForecastGraph, this.solarForecastGraph, this.windForecastGraph, this.hydroForecastGraph, this.thermalForecastGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
  }
  showWind($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.windBool = !this.windBool;
    this.showGeneration($event);
    this.generationBool = !this.generationBool;
  }
  showWindForecast($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.windForecastBool = !this.windForecastBool;
    this.showSolarForecast($event);
    this.solarForecastBool = !this.solarForecastBool;
  }
  showHydro($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.hydroBool = !this.hydroBool;
    this.showGeneration($event);
    this.generationBool = !this.generationBool;
  }
  showThermal($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.thermalBool = !this.thermalBool;
    this.showGeneration($event);
    this.generationBool = !this.generationBool;
  }
  showGeneration($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}GenerationData.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.GenerationArray.push(new Generation(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], row[10], parseFloat(row[11]), row[12]));
        }
        this.createGenerationGraph(this.GenerationArray, this.GenerationGraph, this.solarGraph, this.windGraph, this.hydroGraph, this.thermalGraph)
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.generationBool = !this.generationBool;
  }
  showTotalLoadForecast($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}TotalLoadForecastData.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.TotalLoadForecastArray.push(new TotalLoad(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[10]), row[11]));
        }
        this.TotalLoadForecastGraph = this.createTotalLoadGraph(this.TotalLoadForecastArray, this.TotalLoadForecastGraph)
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.totalLoadForecastBool = !this.totalLoadForecastBool;
  }
  showGenerationForecast($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}GenerationForecastWholeData.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.GenerationForecastArray.push(new Generation(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], ' ', parseFloat(row[10]), row[11]));
        }
        this.createGenerationForecastGraph(this.GenerationForecastArray, this.GenerationForecastGraph);
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.generationForecastBool = !this.generationForecastBool;
  }
  showPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}DayAheadPricesData.csv`, { responseType: 'text' })
    .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.PriceArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[10]), row[11], row[12]));
        }
        this.PriceGraph = this.createPriceGraph(this.PriceArray, this.PriceGraph)
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.priceBool = !this.priceBool;
    console.log(this.priceBool)
  }
  showPredictedPrices($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.predPriceService.getPredPrices()
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.PredPriceArray.push(new Price(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(row[10]), row[11], row[12]));
        }
        this.PredPriceGraph = this.createPriceGraph(this.PredPriceArray, this.PredPriceGraph)
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.predPriceBool = !this.predPriceBool;
  }
  showTotalLoad($event: MouseEvent) {
    let country = this.checkCountryClicked();
    if (country == "") return;
    ($event.target as HTMLButtonElement).disabled = true;
    this.http.get(`../assets/${country.toUpperCase()}ActualTotalLoadData.csv`, { responseType: 'text' })
      .subscribe(data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          this.TotalLoadArray.push(new TotalLoad(parseInt(row[0], 10), parseInt(row[1]), parseInt(row[2]), parseInt(row[3]), new Date(row[4]),
            row[5], row[6], row[7], row[8], row[9], parseFloat(parseFloat(row[10]).toFixed(2)), row[11]));
        }
        this.TotalLoadGraph = this.createTotalLoadGraph(this.TotalLoadArray, this.TotalLoadGraph)
        this.setSeries();
        HC_stock.stockChart('container', this.options);
        // HC_stock.stockChart('container1', this.options1);
      },
        error => {
          console.log(error);
        }
      );
    this.totalLoadBool = !this.totalLoadBool;
  }
}

