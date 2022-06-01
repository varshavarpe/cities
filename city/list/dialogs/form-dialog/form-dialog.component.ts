import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { City } from "../../../city.model";
import { CityService } from "../../../city.service";
import { ApiService } from "src/app/igap/service/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  cityForm: FormGroup;
  city: City;
  stateid = 0;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cityService: CityService,
    private api:ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    this.stateid = data.stateid;
    if (this.action === "edit") {
      this.dialogTitle = data.city.name;
      this.city = data.city;
    } else {
      this.dialogTitle = "New City";
      this.city = new City({});
      this.city.stateid = this.stateid;
    }
    this.cityForm = this.createContactForm();
  }

  formControl = new FormControl("", [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.city.id],
      name: [this.city.name],
      stateid: [this.city.stateid],
    });
  }

  submit(formdata:City) {
    this.cityService.save(formdata).subscribe((result:any)=>{
      if(result.data.status == "success")
      {
        this.showNotification(
          "snackbar-success",
          "Successful",
          "bottom",
          "center"
        );
        this.dialogRef.close();
      }
      else{
        this.showNotification(
          "snackbar-error",
          "Failed - " + result.data.message,
          "bottom",
          "center"
        );
      }
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }  

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
