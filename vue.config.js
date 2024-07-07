const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	devServer: {
		// https: true,
		//proxy: 'https://api.roddom1.vip/',
    proxy: 'http://roddom.test/',
	}
})
