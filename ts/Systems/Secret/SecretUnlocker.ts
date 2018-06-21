import Constants from '../../Data/Constants';

import HexParts from '../Secret/HexParts';

import BackgroundVisualizer from '../Secret/BackgroundVisualizer';
import RoadLighting from '../Secret/RoadLighting';

/** interface that is the same of the json file it get recieved from */
export default interface ILevelData {
    timings: ITiming[];
}
/** Interface for each timing with an according lane */
interface ITiming {
    time: number;
    lane: number;
}

export default class SecretUnlocker extends Phaser.Group
{
    private _backgroundVisualizer: BackgroundVisualizer;
    private _roadLighting: RoadLighting;

    private _hexParts: HexParts;

    private _levelData: ILevelData;
    public _secretSignal: Phaser.Signal;

    private _currentTime: number;

    private _signalSent: boolean;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.createSignal();
        this.addIngredients();

        this._levelData = game.cache.getJSON(Constants.LEVELS[12].json); // Grab the last song, Tunnel Vision
        this._currentTime = 0.001; // add exact timer
        this._signalSent = false;

    }

    private update(): void
    {
        if (Constants.HEX_COLLECTED && !this._signalSent)
        {
            this.countDownSecret();
        }
    }

    private createSignal(): void
    {
        this._secretSignal = new Phaser.Signal(); // create Phaser.Signal for the secret
    }

    private addIngredients(): void
    {
              /* Create the background sprite */
              this._backgroundVisualizer = new BackgroundVisualizer(this.game);

             /* Create road lighting */
              this._roadLighting = new RoadLighting(this.game);

            /* Create hex parts */
              this._hexParts = new HexParts(this.game);

             /* Add to the game */
              this.game.add.existing(this._backgroundVisualizer);
              this.game.add.existing(this._roadLighting);
              this.game.add.existing(this._hexParts);

    }

  private countDownSecret(): void
  {
       // drop = [54]

    if (this._currentTime >= this._levelData.timings[54].time)
    {
        this._signalSent = true;

        this._secretSignal.dispatch();

        this._backgroundVisualizer.makeVisible(); // FIX WITH SIGNAL
        this._roadLighting.changeHighlight();
    }

    if (!this._signalSent)
    {
        this._currentTime += 1 * 0.025;
    }
  }

      /** destroys and clears all secret lockables */
      public destroy(): void
      {
         this._levelData = null;

         this._backgroundVisualizer.destroy();
         this._backgroundVisualizer = null;

         this._roadLighting.destroy();
         this._roadLighting = null;
      }
  }
}