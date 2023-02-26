import {PermissionFlagsBits} from 'discord-api-types/v10';

/**
 * {@link CommandConfig CommandConfig.ts}
 *
 * Stores configurations for a specific command
 * for a bot instance.
 *
 * @license {@link http://www.apache.org/licenses/ Apache-2.0}
 * @copyright WeslayCodes 2023
 */
export class CommandConfig {
    public readonly name: string = '';
    public readonly description: string = '';
    public readonly staffOnly: boolean = false;
    public readonly devOnly: boolean = false;
}