const state = {
	processing: false,
	error: {
		active: false,
		message: "",
		code: 0,
	},
};

const mutations = {
	setProcessing(state, processing) {
		this.state.processing = processing;
	}
};

const actions = {
	setProcessing: ({commit}, value) => commit('setProcessing', value),
	setError(state, error) {
		state.error.active = true;
		state.error.errorMessage = error;
		state.error.code = 500;
	},
};

export default {
	state,
	mutations,
	actions,
};
