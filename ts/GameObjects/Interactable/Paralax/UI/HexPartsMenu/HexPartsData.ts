/** Return a random part of hex (used for ) */
export function getRandomHexPart(): HexParts
{
    return Math.floor(Math.random() * 15) + 1;
}

/** All the sub parts of hex residing in the body parts */
export enum HexParts
{
    none = 0,

    /** Head parts */
    head_chip = 2,
    head_wires = 3,

    /** Left arm parts */
    left_arm_screws = 5,
    left_arm_metal = 6,
    left_arm_wires = 7,

    /** Right arm parts */
    right_arm_screws = 8,
    right_arm_metal = 9,
    right_arm_wires = 10,

    /** Body parts */
    torso_hearth = 12,
    torso_screws = 13,
    torso_wires = 14,

    /** Booster parts */
    booster_battery = 15

}

/** All the body parts of hex */
export enum HexBodyParts
{
    none = 0,

    head = 1,

    neck = 2,

    leftArm = 3,
    rightArm = 4,

    torso = 5,

    booster = 6
}

/** A sub part of hex */
export interface IHexPart
{
    frameName: string;
    collected: boolean;
}

/** A body part of hex */
export interface IHexBodyPart
{
    name: string;
    frameName: string;
    subParts: IHexPartsCollection;
}

/** A collection of sub parts of hex */
export interface IHexPartsCollection
{
    [key: number]: IHexPart;
}

/** A collection of body parts of hex */
export interface IHexBodyPartsCollection
{
    [key: number]: IHexBodyPart;
}

/** The default hex parts data, collecting all the values  */
export let defaultHexPartsData: IHexBodyPartsCollection = {

    /** Head */
    [HexBodyParts.head]: {
        name: 'Head',
        frameName: 'Head',
        subParts: {

            [HexParts.head_chip]: {
                frameName: 'Chip',
                collected: false
            },
            [HexParts.head_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Left arm */
    [HexBodyParts.leftArm]: {
        name: 'Left arm',
        frameName: 'Left_arm',
        subParts: {

            [HexParts.left_arm_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.left_arm_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.left_arm_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Right arm */
    [HexBodyParts.rightArm]: {
        name: 'Right arm',
        frameName: 'Right_arm',
        subParts: {

            [HexParts.right_arm_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.right_arm_metal]: {
                frameName: 'Metal',
                collected: false
            },
            [HexParts.right_arm_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Body */
    [HexBodyParts.torso]: {
        name: 'Torso',
        frameName: 'Torso',
        subParts: {

            [HexParts.torso_hearth]: {
                frameName: 'Hearth',
                collected: false
            },
            [HexParts.torso_screws]: {
                frameName: 'Screws',
                collected: false
            },
            [HexParts.torso_wires]: {
                frameName: 'Wires',
                collected: false
            }

        }
    },

    /** Booster */
    [HexBodyParts.booster]: {
        name: 'Booster',
        frameName: 'Booster',
        subParts: {

            [HexParts.booster_battery]: {
                frameName: 'Battery',
                collected: false
            }

        }
    }

};
