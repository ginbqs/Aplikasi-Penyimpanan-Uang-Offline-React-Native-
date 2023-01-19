/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React,{useEffect,useState} from 'react';
 import {createStore,combineReducers,applyMiddleware} from 'redux'
 import {Provider} from 'react-redux'
 import ReduxThunk from 'redux-thunk'
 import FlashMessage from "react-native-flash-message";
 import SplashScreen from 'react-native-splash-screen'
 
 import reducersCategories from './store/reducers/categories'
 import reducersConfig from './store/reducers/config'
 import reducersTransactions from './store/reducers/transactions'
 import reducersTransactionsFilter from './store/reducers/transactionsfilter'
 import AppNavigation from './navigations/AppNavigation';
import { init } from './databases';
import logShow from './utils/logShow';
 
 const rootReducer = combineReducers({
   configs: reducersConfig,
   categories: reducersCategories,
   transactions: reducersTransactions,
   transactionsFilter: reducersTransactionsFilter
 })
 
 const store = createStore(rootReducer,applyMiddleware(ReduxThunk))
 
 
 const App = () => {
  const [dbInitialized,setDbInitialized] = useState(false)


   useEffect(() => {
      init().then(() => {
        setDbInitialized(true)
      }).catch((err) => {
        logShow(err)
        showMessage({
          message: "Terjadi kesalahan pada sistem. Silahkan tutup lalu buka kembali!",
          type: "danger",
        });
      })
   }, []);
   if(dbInitialized) {
    SplashScreen.hide()
    return (
      <Provider store={store}>
        <AppNavigation />
        <FlashMessage position="top" />
      </Provider>
    )
   };
   
 };
 
 export default App;
 