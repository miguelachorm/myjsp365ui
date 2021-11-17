import { Injectable } from "@angular/core";
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

  private loader: any

  constructor(private loading: LoadingController) {
  }

  async showLoader() {
    this.loader = await this.loading.create({
      message: 'Please wait...',
    })

    this.loader.present()
  }

  async hideLoader() {
        await this.loader.dismiss();
        this.loader = null;
  }
}
