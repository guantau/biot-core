const core = require('../core');
const ChannelsManager = require('../lib/ChannelsManager');

async function start() {
	await core.init('test');
	let wallets = await core.getMyDeviceWallets();
	const channelsManager = new ChannelsManager(wallets[0]);
	let channel;
	let list = await channelsManager.list();
	console.error('list', list);
	// if (list.length) {
	// 	console.error('start recovery');
	// 	channel = channelsManager.recoveryChannel(list[0]);
	// 	channel.events.on('start', () => {
	// 		console.error('channel start. t.js', channel.id);
	// 	});
	// 	await channel.init();
	// 	console.error('init');
	// 	await channel.approve();
	// 	console.error('channel', channel);
	// 	console.error(channel.info());
	// }

	channelsManager.events.on('newChannel', async (objInfo) => {
		console.error('new Channel: ', objInfo);
		channel = channelsManager.getNewChannel(objInfo);
		channel.events.on('start', () => {
			console.error('channel start. t.js', channel.id);
		});
		await channel.init();
		await channel.approve();
		console.error(channel.info());
	})
}

start().catch(console.error);