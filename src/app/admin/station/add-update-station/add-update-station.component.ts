import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { Station } from './../../../_models/station/station';
import { StationService } from '../../../_services/station/station.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

declare const L: any;
@Component({
  selector: 'app-add-update-station',
  templateUrl: './add-update-station.component.html',
  styleUrls: ['./add-update-station.component.scss']
})
export class AddUpdateStationComponent implements OnInit {
  stationForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  lat: number;
  lng: number;
  stationData: Station;
  msg: string = "Add";

  mymap: Leaflet.Map;
  marker: Leaflet.Marker;

  constructor(
    private formBuilder: FormBuilder,
    public loader: LoaderService,
    private stationService: StationService,
    private notifierService: NotifierService,
    private router: Router,
    private dialogRef: MatDialogRef<AddUpdateStationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Station
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setMap();


    if (this.data) {
      this.msg = "Update";
      this.setValues();
    }
  }

  setValues() {
    // this.stationForm.setValue(this.data);
    // stationName: ['', Validators.required],
    this.stationForm.reset();
    this.form.stationName.setValue(this.data.stationName);
    this.form.swipeId.setValue(this.data.swipeMachineId);
    this.form.lat.setValue(this.data.latitude);
    this.form.lng.setValue(this.data.longitude);
  }

  setMap() {
    if (!navigator.geolocation) {
      console.log('location is not supported..!');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.lat = coords.latitude;
      this.lng = coords.longitude;

      const latLng = [coords.latitude, coords.longitude];

      if (!this.data) {
        this.form.lat.setValue(coords.latitude.toFixed(7));
        this.form.lng.setValue(coords.longitude.toFixed(7));
      }

      // console.log(`lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`);
      this.mymap = L.map('map').setView(latLng, 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmlhbXlhbmEiLCJhIjoiY2twbDQ3eTJlMHBhZzJ1b2FjZzE0eGFjNSJ9.y-XpM9vGkkknCYg7Wuh3Hg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(this.mymap);

      var searchControl = new L.esri.Controls.Geosearch().addTo(this.mymap);

      var results = new L.LayerGroup().addTo(this.mymap);

      searchControl.on('results', data => {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          // results.addLayer(L.marker(data.results[i].latlng));
          this.marker.setLatLng(data.results[i].latlng);
          this.form.lat.setValue(data.results[i].latlng.lat.toFixed(7));
          this.form.lng.setValue(data.results[i].latlng.lng.toFixed(7));
        }
      });

      this.marker = L.marker(latLng).addTo(this.mymap);
      // this.mymap.on('click', this.onMapClick);
      this.mymap.on("click", e => {
        this.form.lat.setValue(e.latlng.lat.toFixed(7));
        this.form.lng.setValue(e.latlng.lng.toFixed(7));
        this.marker.setLatLng(e.latlng);
      });
    });

    this.form.lat.setValue(this.lat);
  }

  initForm() {
    this.stationForm = this.formBuilder.group({
      stationName: ['', Validators.required],
      swipeId: ['', Validators.required],
      lat: [`${this.lat}`, Validators.required],
      lng: ['', Validators.required]
    });

    // this.form.lat.setValue('dkfdkjk');
    this.form.lat.disable();
    this.form.lng.disable();
  }

  get form() {
    return this.stationForm.controls;
  }

  getValue() {
    this.stationData = {
      stationId: this.data?this.data.stationId:0,
      stationName: this.form.stationName.value,
      latitude: this.form.lat.value,
      longitude: this.form.lng.value,
      swipeMachineId: this.form.swipeId.value
    };
  }

  onAdd() {
    this.getValue();

    this.stationService.addStation(this.stationData).subscribe(
      data => {
        console.log(data);
        // this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Station'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.mymap.remove();
  }

  onUpdate() {
    this.getValue();

    this.stationService.updateStation(this.stationData).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessUpdateMsg('Station'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });

      this.dialogRef.close();
  }
}
