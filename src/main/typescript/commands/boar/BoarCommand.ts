import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {BoarBotApp} from '../../BoarBotApp';
import {Command} from '../../api/commands/Command';
import {LogDebug} from '../../util/logging/LogDebug';
import {Subcommand} from '../../api/commands/Subcommand';

/**
 * {@link BoarCommand BoarCommand.ts}
 *
 * All main boar commands.
 *
 * @license {@link http://www.apache.org/licenses/ Apache-2.0}
 * @copyright WeslayCodes 2023
 */
export default class BoarCommand implements Command {
    private config = BoarBotApp.getBot().getConfig();
    private commandInfo = this.config.commandConfigs.boar;
    public readonly data = new SlashCommandBuilder()
        .setName(this.commandInfo.name)
        .setDescription(this.commandInfo.description)
        .setDMPermission(false)
        .setDefaultMemberPermissions(this.commandInfo.perms)
        .addSubcommand(sub => sub.setName(this.commandInfo.help.name)
            .setDescription(this.commandInfo.help.description)
            .addIntegerOption(option => option.setName(this.commandInfo.help.args[0].name)
                .setDescription(this.commandInfo.help.args[0].description)
                .setRequired(this.commandInfo.help.args[0].required !== undefined)
                .setChoices(...this.commandInfo.help.args[0].choices)
            )
            .addIntegerOption(option => option.setName(this.commandInfo.help.args[1].name)
                .setDescription(this.commandInfo.help.args[1].description)
                .setRequired(this.commandInfo.help.args[1].required !== undefined)
            )
        )
        .addSubcommand(sub => sub.setName(this.commandInfo.daily.name)
            .setDescription(this.commandInfo.daily.description)
            .addBooleanOption(option => option.setName(this.commandInfo.daily.args[0].name)
                .setDescription(this.commandInfo.daily.args[0].description)
                .setRequired(this.commandInfo.daily.args[0].required !== undefined)
            )
            .addBooleanOption(option => option.setName(this.commandInfo.daily.args[1].name)
                .setDescription(this.commandInfo.daily.args[1].description)
                .setRequired(this.commandInfo.daily.args[1].required !== undefined)
            )
        )
        .addSubcommand(sub => sub.setName(this.commandInfo.collection.name)
            .setDescription(this.commandInfo.collection.description)
            .addUserOption(option => option.setName(this.commandInfo.collection.args[0].name)
                .setDescription(this.commandInfo.collection.args[0].description)
                .setRequired(this.commandInfo.collection.args[0].required !== undefined)
            )
            .addIntegerOption(option => option.setName(this.commandInfo.collection.args[1].name)
                .setDescription(this.commandInfo.collection.args[1].description)
                .setRequired(this.commandInfo.collection.args[1].required !== undefined)
                .setChoices(...this.commandInfo.collection.args[1].choices)
            )
            .addStringOption(option => option.setName(this.commandInfo.collection.args[2].name)
                .setDescription(this.commandInfo.collection.args[2].description)
                .setRequired(this.commandInfo.collection.args[2].required !== undefined)
            )
        )
        .addSubcommand(sub => sub.setName(this.commandInfo.top.name)
            .setDescription(this.commandInfo.top.description)
            .addStringOption(option => option.setName(this.commandInfo.top.args[0].name)
                .setDescription(this.commandInfo.top.args[0].description)
                .setRequired(this.commandInfo.top.args[0].required !== undefined)
                .setChoices(...this.commandInfo.top.args[0].choices)
            )
            .addUserOption(option => option.setName(this.commandInfo.top.args[1].name)
                .setDescription(this.commandInfo.top.args[1].description)
                .setRequired(this.commandInfo.top.args[1].required !== undefined)
            )
            .addIntegerOption(option => option.setName(this.commandInfo.top.args[2].name)
                .setDescription(this.commandInfo.top.args[2].description)
                .setRequired(this.commandInfo.top.args[2].required !== undefined)
            )
        )
        .addSubcommand(sub => sub.setName(this.commandInfo.market.name)
            .setDescription(this.commandInfo.market.description)
            .addIntegerOption(option => option.setName(this.commandInfo.market.args[0].name)
                .setDescription(this.commandInfo.market.args[0].description)
                .setRequired(this.commandInfo.market.args[0].required !== undefined)
                .setChoices(...this.commandInfo.market.args[0].choices)
            )
            .addStringOption(option => option.setName(this.commandInfo.market.args[1].name)
                .setDescription(this.commandInfo.market.args[1].description)
                .setRequired(this.commandInfo.market.args[1].required !== undefined)
            )
        );

    /**
     * Executes the called subcommand if it exists
     *
     * @param interaction - An interaction that could've called a boar subcommand
     */
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const subcommand: Subcommand | undefined = BoarBotApp.getBot().getSubcommands()
            .get(interaction.options.getSubcommand());

        if (subcommand) {
            const exports: any = require(subcommand.data.path);
            const commandClass: any = new exports.default();

            try {
                await commandClass.execute(interaction);
            } catch (err: unknown) {
                await LogDebug.handleError(err, interaction);
            }
        }
    }
}