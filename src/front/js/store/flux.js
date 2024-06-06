const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: "",
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			login: async (email, password) => {
				const login = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST", 
					headers: {
						"Content-Type": "Application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				const data = await login.json()
				setStore({
					"token": data.token
				})
				localStorage.setItem("token", data.token)
				console.log(data)

			},

			signup: async (email, password) => {
				const signup = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST", 
					headers: {
						"Content-Type": "Application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				const data = await signup.json()
				console.log(data)

			},

			/*private: async () => {
				const privatePage = await fetch(process.env.BACKEND_URL + "/api/private", {
					method: "GET", 
					headers: {
						"Content-Type": "Application/json",
						Authorization: `Bearer ${store.token}`
					}
				})
				const data = await privatePage.json()
				console.log(data)
			},*/

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
