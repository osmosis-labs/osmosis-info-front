import axios from "axios"

class API {
	constructor() {
		if (!API.instance) {
			this.token = null
			API.instance = this
		}
		this.token = null
		this.url = "https://api-osmosis.imperator.co/"
		this.baseURL = this.url + ""
		this.captchaKey = "6LcibsgaAAAAAEjfNfpoSd3TRhgRDFAjAgOOgAFe"
		return API.instance
	}

	getURL = () => this.url

	request = ({ url, type, data, params, useCompleteURL = false }) => {
		let options = {
			method: type,
			url: !useCompleteURL ? this.baseURL + url : url,
		}
		if (data) options.data = data
		if (params) options.params = params
		return axios(options)
	}
}

const instance = new API()

export default instance
