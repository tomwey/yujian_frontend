import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { ScriptStore } from './script.store';

/*
  Generated class for the ScriptLoadProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ScriptLoadProvider {

  private scripts: any = {};
  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      }
    });
    // console.log('Hello ScriptLoadProvider Provider');
  }

  load(...scripts: string[]) {
    let promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({script: name, loaded: true, status: '已经加载成功'});
      } else {
        // load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src  = this.scripts[name].src;
        // script.async = true;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({script:name, loaded: true, status: 'Loaded'});
        };

        script.onerror = (error: any) => resolve({script:name, loaded: false, status: 'Loaded Failure'});
        document.getElementsByTagName('head')[0].appendChild(script);
        // document.body.appendChild(script);
      }
    });
  }

}
