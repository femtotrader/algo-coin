import {CommandRegistry} from "@phosphor/commands";
import {DockPanel, Menu, MenuBar, Panel} from "@phosphor/widgets";
import {DataLoader, PerspectiveDataLoader} from "phosphor-perspective-utils/data";
import {COMMAND_ICONS, COMMANDS} from "./define";
import {ITab} from "./utils";

export
function buildMarketDataTab(commands: CommandRegistry): ITab {
  const marketDataContainer = new Panel();
  marketDataContainer.title.label = "Data";
  marketDataContainer.addClass("marketdata-container");

  const bar = new MenuBar();
  const marketData = new DockPanel();

  const liveMenu = new Menu({commands});
  liveMenu.title.label = "Live";

  const trades = new PerspectiveDataLoader("Trades");
  const bidask = new PerspectiveDataLoader("Orders");

  const dataLoader = new DataLoader([trades], "/api/json/v1/messages", {pair: "BTCUSD", type: "TRADE"});
  const bidLoader = new DataLoader([bidask], "/api/json/v1/orders", {pair: "BTCUSD", type: "CHANGE"});

  commands.addCommand(COMMANDS.LIVEDATA_TRADES, {
    execute: () => {
      marketData.addWidget(trades);
    },
    iconClass: COMMAND_ICONS.LIVEDATA_TRADES,
    label: "Trades",
    mnemonic: 2,
  });
  liveMenu.addItem({ command: COMMANDS.LIVEDATA_TRADES});

  commands.addCommand(COMMANDS.LIVEDATA_ORDERBOOK, {
    execute: () => {
      marketData.addWidget(bidask);
    },
    iconClass: COMMAND_ICONS.LIVEDATA_ORDERBOOK,
    label: "Order Book",
    mnemonic: 2,
  });
  liveMenu.addItem({ command: COMMANDS.LIVEDATA_ORDERBOOK});

  bar.addMenu(liveMenu);

  const historicalMenu = new Menu({commands});
  historicalMenu.title.label = "Historical";
  bar.addMenu(historicalMenu);

  marketDataContainer.addWidget(bar);
  marketDataContainer.addWidget(marketData);

  return {tab: marketDataContainer, loaders: [dataLoader, bidLoader], perspectives: [trades, bidask]};
}
