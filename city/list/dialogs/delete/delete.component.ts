import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { CityService } from "../../../city.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cityService: CityService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.cityService.delete(this.data.id);
    this.dialogRef.close();
  }
}
