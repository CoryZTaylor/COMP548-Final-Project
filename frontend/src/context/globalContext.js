import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5001/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}login`, { email, password });
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        return true;
    } catch (error) {
        return false;
    }
    };

    const registerUser = async (username, email, password, confirmPassword, image) => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            formData.append('image', image);
        
            const response = await axios.post(`${BASE_URL}register`, formData);
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            return true;
        } catch (error) {
            return false;
        }
      };      

    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // Add a new state variable to store the user information
    const [user, setUser] = useState(null);

    // Function to fetch the user information using the JWT token
    const fetchUser = async () => {
        if (!token) return;

        const headers = { Authorization: token };
        try {
            const response = await axios.get(`${BASE_URL}user`, { headers });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const verifyToken = async (token) => {
        try {
          const response = await axios.post(`${BASE_URL}verify-token`, { token });
          return response.data.success;
        } catch (error) {
          return false;
        }
      };      

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const headers = { Authorization: token };
        const response = await axios.post(`${BASE_URL}add-income`, income, { headers })
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const headers = { Authorization: token };
        const response = await axios.get(`${BASE_URL}get-incomes`, { headers })
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        const headers = { Authorization: token };
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`, { headers })
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate expenses
    const addExpense = async (expense) => {
        const headers = { Authorization: token };
      
        try {
          const response = await axios.post(`${BASE_URL}add-expense`, expense, { headers });
          getExpenses();
        } catch (err) {
          setError(err.response.data.message);
        }
    };
      
    const getExpenses = async () => {
        const headers = { Authorization: token };
        try {
          const response = await axios.get(`${BASE_URL}get-expenses`, { headers });
          setExpenses(response.data);
        } catch (err) {
          setError(err.response.data.message);
        }
    };
      
    const deleteExpense = async (id) => {
        const headers = { Authorization: token };
      
        try {
          const res = await axios.delete(`${BASE_URL}delete-expense/${id}`, { headers });
          getExpenses();
        } catch (err) {
          setError(err.response.data.message);
        }
    };
      
    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) => {
          totalExpenses = totalExpenses + expense.amount;
        });
      
        return totalExpenses;
    };      


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            loginUser,
            logoutUser,
            registerUser,
            user,
            setUser,
            fetchUser, 
            verifyToken, 
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            token,
            setToken,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}