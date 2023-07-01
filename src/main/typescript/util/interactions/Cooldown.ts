import {BotConfig} from '../../bot/config/BotConfig';
import {ChatInputCommandInteraction} from 'discord.js';
import {Replies} from './Replies';

/**
 * {@link Cooldown Cooldown.ts}
 *
 * Handles cooldowns on commands.
 *
 * @license {@link http://www.apache.org/licenses/ Apache-2.0}
 * @copyright WeslayCodes 2023
 */
export class Cooldown {
    public static cooldowns: Set<string> = new Set();

    /**
     * Handles cooldowns for users
     *
     * @param config - Used to get the string to reply with
     * @param interaction - Interaction to reply to
     */
    public static async handleCooldown(
        interaction: ChatInputCommandInteraction,
        config: BotConfig
    ): Promise<boolean> {
        if (this.cooldowns.has(interaction.user.id)) {
            await Replies.onCooldownReply(interaction, config);
            return true;
        }

        this.cooldowns.add(interaction.user.id);

        setTimeout(() => {
            this.cooldowns.delete(interaction.user.id);
        }, 5000);

        return false;
    }
}