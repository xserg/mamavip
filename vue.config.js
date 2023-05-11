const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
	devServer: {
		// https: true,
		proxy: 'https://api.xn--80axb4d.online/',
	}
})
