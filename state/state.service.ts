import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { State } from "./state.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";

@Injectable()

export class StateService  extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<State[]> = new BehaviorSubject<State[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): State[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(): void {
    let formdata = {data:{}}
    this.api.post("shared/state/list", formdata).subscribe((result:any)=>{
      if(result.data.status == "success"){
        this.isTblLoading = false;
        this.dataChange.next(result.data.data);
      }
      else{
        this.isTblLoading = false;
      }
    });
  }

  get(id): void {
    let formdata = {data:{id:id}}
    this.api.post("shared/state/get", formdata).subscribe((result:any)=>{
      this.dataChange.next(result.data.data);
    });
  }

  save(state: State) {
    return this.api.post("shared/state/save", state);
  }
  
  delete(id: number): void {
    this.api.post("shared/state/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
