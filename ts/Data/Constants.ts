import 'phaser-ce';

import IGamePhase from '../Enums/GamePhase';
import JSON from './JSON';
import Sounds from './Sounds';

export interface IRoadColors
{
    bottomMiddleColor: number;
    bottomOuterColor: number;
    topMiddleColor: number;
    topOuterColor: number;
    topSprite: string;
    bottomSprite: string;
}

interface ILevel
{
    title: string;
    artist: string;
    json: string;
    music: string;
}

interface ICar
{
    carName: string;
    spriteKey: string;
    description: string;
}

/**
 * All the information that should be accassible from anywhere
 */
export default class Constants
{
    public static PLAYING_MUSIC: boolean;
    public static PLAYING_SOUND_EFFECTS: boolean;

    public static HORIZON_POSITION: {x: number, y: number} = {x: .5, y: .5};

    public static GLOBAL_SPEED: number = 2.5;

    public static PLAYER_Z_POSITION: number = 1.05;

    public static DELTA_TIME: number = 1;
    /** How long the current game is running for */
    public static GAME_TIME: number = 0;

    public static readonly SPAWN_DELAY: number = 3.5;

    public static CURRENT_LEVEL: number = 0;

    public static readonly PICKUPS_BEFORE_HEX_PART: number = 150;

    /** road colors list with their own color schemes */
    public static readonly ROAD_COLORS: IRoadColors[] = [
        {
            //red
            bottomMiddleColor: 0x8bf2d6,
            bottomOuterColor: 0x66090f,
            //blue
            topMiddleColor: 0xf4091a,
            topOuterColor: 0x148694,

            topSprite: 'Red',
            bottomSprite: 'Blue'
        },
        {
            //blue
            bottomMiddleColor: 0xf99ff4,
            bottomOuterColor: 0x6f87f0,
            //purple
            topMiddleColor: 0xc7e5f4,
            topOuterColor: 0xd13df1,

            topSprite: 'DarkBlue',
            bottomSprite: 'Purple'

        }
    ];

    /** The levels */
    public static readonly LEVELS: ILevel[] = [
        {
            title: 'Head Up',
            artist: 'Don Diablo',
            json: JSON.HEAD_UP,
            music: Sounds.HEAD_UP
        },
        {
            title: 'People Say',
            artist: 'Don Diablo',
            json: JSON.PEOPLE_SAY,
            music: Sounds.PEOPLE_SAY
        },
        {
            title: 'Give me your love',
            artist: 'Don Diablo',
            json: JSON.GIVE_ME_YOUR_LOVE,
            music: Sounds.GIVE_ME_YOUR_LOVE
        },
        {
            title: 'Dont let go',
            artist: 'Don Diablo',
            json: JSON.DONT_LET_GO,
            music: Sounds.DONT_LET_GO
        },
        {
            title: 'You cant change me',
            artist: 'Don Diablo',
            json: JSON.YOU_CANT_CHANGE_ME,
            music: Sounds.YOU_CANT_CHANGE_ME
        },
        {
            title: 'Save a little love',
            artist: 'Don Diablo',
            json: JSON.SAVE_A_LITTLE_LOVE,
            music: Sounds.SAVE_A_LITTLE_LOVE
        },
        {
            title: 'Reflections',
            artist: 'Don Diablo',
            json: JSON.REFLECTIONS,
            music: Sounds.REFLECTIONS
        },
        {
            title: 'Satalite',
            artist: 'Don Diablo',
            json: JSON.SATALITE,
            music: Sounds.SATALITES
        }

    ];

    public static readonly CARS: ICar[] = [
        {
            carName: 'D1-A8L0',
            spriteKey: 'ingame_vehicle_1_sideview_right',
            description: 'Lexus model, number original!'
        },
        {
            carName: 'Neon Drifter',
            spriteKey: 'ingame_vehicle_2_sideview_right',
            description: 'Drift like the fastest riders\n in Hexagonia!'
        },
        {
            carName: 'Phaser Noir',
            spriteKey: 'ingame_vehicle_3_sideview_right',
            description: 'Slick, swift and better in\n black!'
        }
    ];

    /** All the phases saved in a Phase array */
    public static readonly PHASES: IGamePhase[] = [
        {
            phaseDuration: 10,
            amountOfLanes: 2,
            pickupSpeed: 2.5
        },
        {
            phaseDuration: 20,
            amountOfLanes: 3,
            pickupSpeed: 2.8
        },
        {
            phaseDuration: 25,
            amountOfLanes: 4,
            pickupSpeed: 3
        },
        {
            phaseDuration: 25,
            amountOfLanes: 5,
            pickupSpeed: 3.2
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 3.5
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 3.7
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 4
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 4.2
        }
    ];

    public static readonly GLOW_FILTER: string[] = [
        'precision lowp float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',

        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 3.0/abs(float(dist));', //here the glowscale is defined
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];

    /** Should shaders be applied */
    public static USE_FILTERS: boolean = true;
    /** All the GPU's that don't work with shaders */
    public static GPU_SHADER_BLACKLIST: string[] = [
        /** Tested on a Oneplus 6 */
        'Adreno (TM) 630',
        /** Tested on a Oneplus 3 */
        'Adreno (TM) 530'
    ];
}
