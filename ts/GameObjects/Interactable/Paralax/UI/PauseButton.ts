import 'phaser-ce';

//import Atlases from '../../../../Data/Atlases';
import ImageButton from './ImageButton';

/** Pausebutton used in the ingame ui of the gameplay state */
export default class PauseButton extends Phaser.Group
{
    public onPause: Phaser.Signal;

    public pauseButton: ImageButton;
    //private _pauseBackground: Phaser.Sprite;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onPause = new Phaser.Signal();

        // this._pauseBackground = new Phaser.Sprite(this.game, this.game.width / 1.07, this.game.height / 2.45, Atlases.Interface, 'UserInterface_PauseHud_Backdrop');
        // this._pauseBackground.anchor.set(1, .5);

        this.pauseButton = new ImageButton(this.game, this.game.width / 1.075, this.game.height / 2, 'UserInterface_PauseHud_Backdrop', 'ui_ingame_button_pause', () => {
            this.onPause.dispatch();
        }, this);
        this.pauseButton.anchor.set(1, .5);
        this.pauseButton.icon.anchor.set(1, .5);

        //this.addChild(this._pauseBackground);
        this.game.add.existing(this.pauseButton);

        this.resize();
    }

    /** Resizes the object to fit in the devices sizes */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height / 2);

        this.pauseButton.scale.set(vmin / GAME_WIDTH);
        this.pauseButton.position.set(this.game.width, this.game.height / 2);

        // this._pauseBackground.scale.set(vmin / GAME_WIDTH);
        // this._pauseBackground.position.set(this.game.width, this.game.height / 2);
    }
}
