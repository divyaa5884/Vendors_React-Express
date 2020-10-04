import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		configData: {},
		invoiceData: {},
		vendorData: {},
		mergedData: [],
		fieldDisplay: {}
	}

	getData = async (URL, call2, call3) =>{
		
		const invoicePromise = axios.get(URL + call2)
		const vendorPromise = axios.get(URL + call3)
		const promiseResponse = await Promise.all([invoicePromise, vendorPromise])
		const invoiceData =  promiseResponse[0].data
		const vendorData = promiseResponse[1].data
		return {invoiceData, vendorData}
	}

	getDataFromApi = async () => {
		const URL = "http://localhost:8000"
		const configResponse = await axios.get(URL+'/app/config')
		const configData = configResponse.data;
		const {invoiceData, vendorData } = await this.getData(URL, configData.dataEndPoints.call2.path, configData.dataEndPoints.call3.path)
		this.setState({ configData, invoiceData, vendorData });
	}

	processFunction = () => {
		const vendors = this.state.vendorData.vendors
		const invoices = this.state.invoiceData.invoices
		const configData = this.state.configData
		const mergedData = []
		vendors.forEach(vendor => {
			const vendorId = vendor.vendorId
			var totalAmountBal = 0, totalDueBal = 0
			invoices.forEach((invoice) =>{
				if(invoice.vendorId === vendorId){
					totalAmountBal = totalAmountBal + invoice.amountBal
					totalDueBal = totalDueBal + invoice.amountDue
				}
			});
			const mergedObject = {}, fieldDisplay = {};
			configData.tableConfig.columns.forEach((column)=> {
				if(column.display === true){
					fieldDisplay[column.displayName] = column.fieldName;
					if(column.fieldName === "amountBal"){
						mergedObject[column.fieldName] = totalAmountBal
					} else if(column.fieldName === "amountDue"){
						mergedObject[column.fieldName] = totalDueBal
					} else if(column.fieldName === "vendorName"){
						mergedObject[column.fieldName] = (vendor.vendorName == null) ? vendor.vendorName : ""
					} else if(column.fieldName === "creditBal"){
						mergedObject[column.fieldName] = vendor.creditBal
					} else if(column.fieldName === "vendorId"){
						mergedObject[column.fieldName] = vendor.vendorId
					}
				}
			})
			this.setState({fieldDisplay});
			mergedData.push(mergedObject)
		});
		this.setState({ mergedData })
	}

	async componentDidMount() {
		await this.getDataFromApi()
		this.processFunction()
		console.log(this.state.mergedData)
	}

	
	payment() {
		// return(
  //   <Popup trigger={<button> Trigger</button>} position="right center">
	 //    <div>Popup content here !!</div>
	 //  </Popup>
	 //  )
  }


	render() {
		/*
		const {vendorData} = this.state.vendorData;
		*/
		const {tableConfig} = this.state.configData;
		console.log(tableConfig);
		const {invoices} = this.state.invoiceData;
		const invoiceLen = 2;
		if(tableConfig){
			return (
				invoiceLen === 0 ? <p>Rendering invoices and vendors data</p> : (
					<div className="App">
							<table className="tableWrapper">
			          <thead>
			            <tr>
			            	Object.keys(this.state.fieldDisplay).forEach((ele)=>{
			            		<th>{this.state.fieldDisplay[ele]}</th>
			            	})
			            </tr>
			          </thead>
			          <tbody>
			            {this.state.mergedData.map((user) => (
			              <tr key={user.vendorId}>
			                <td>{user.vendorId}</td>
			                <td>{user.vendorName}</td>
			                <td>{user.creditBal}</td>
			                <td>{user.amountBal}</td>
			                <td>{user.amountDue}</td>
			                <td><button disabled={user.amountDue>0 ? true : false}>Make a payment</button></td>
			              </tr>
			            ))}
			          </tbody>
			        </table>
					</div>
				)
			);
		} else {
			return <div>dcfdvcdv</div>
		}
	}
}

export default App;

