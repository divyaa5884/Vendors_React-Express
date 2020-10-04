const config = {
	//Table Configuration
	"tableConfig": {
		//Define config for All columns
		"paymentEnabled": false, //if action enabled is true, then there will be a last column with Button, which when clicked will open the modal - that either shows Adjust / Payment or Both
		"adjustEnabled" : true, // if payment is enabled and Adjustment is enabled, then the user can use Credit. else he can only do payment (using credit card)
		"columns": [
            {
				"fieldName": "vendorId",
				"displayName" : "Vendor ID",
				"display" : true,
				"filteringEnabled" : false,
				"sortingEnabled" : true
			},{
                "fieldName": "vendorName",
                "displayName" : "Vendor Name",
                "display" : true,
                "filteringEnabled" : false,
                "sortingEnabled" : true
            },{
                "fieldName": "creditBal",
                "displayName" : "Total Credit Bal",
                "display" : true,
                "filteringEnabled" : false,
                "sortingEnabled" : true
            },{
                "fieldName": "amountBal",
                "displayName" : "total Amount Bal",
                "display" : true,
                "filteringEnabled" : false,
                "sortingEnabled" : true
            },{
                "fieldName": "amountDue",
                "displayName" : "total Due Bal",
                "display" : true,
                "filteringEnabled" : false,
                "sortingEnabled" : true
            }

		],
	},
	"dataEndPoints" :{
		"call2" : {
            "path": "/invoices"
		},
		"call3" : {
            "path": "/vendors"
		},
		"creditPost" : {
            "path": "/credit/apply"
		},
		"paymentPost" : {
            "path": "/payment"
		}
	}
}

const invoiceList = {
    'invoices': [
        {
            "invoiceId": 1234,
            "vendorId" : "G1",
            "quantity" : 20,
            "product" : "Apple",
            "amountBal" : 129.92,
            "amountDue" : 25.50,
            "invoiceDate" : 04/01/2020  
        },
        {
            "invoiceId": 4578,
            "vendorId" : "Delmonte",
            "product" : "B1",
            "quantity" : 500,
            "amountBal" : 1024.12,
            "amountDue" : 512.50,
            "invoiceDate" : 03/31/2020  
        },
        {
            "invoiceId": 9999,
            "vendorId" : "W1",
            "quantity" : 1000,
            "Product" : "Napkin",
            "amountBal" : 12.25,
            "amountDue" : 12.25,
            "invoiceDate" : 03/31/2020  
        },
        {
            "invoiceId": 1000,
            "vendorId" : "W1",
            "quantity" : 25,
            "Product" : "Sanitizer",
            "amountBal" : 25.00,
            "amountDue" : 12.25,
            "invoiceDate" : 03/31/2020  
        },
        {
            "invoiceId": 1025,
            "vendorId" : "W1",
            "quantity" : 1000,
            "Product" : "Napkin",
            "amountBal" : 0,
            "amountDue" : 0,
            "invoiceDate" : 03/31/2020  
        }
    ]
}

const vendorList = {
    'vendors': [
        {
            "vendorId": "D1",
            "vendorName": "Delmonte",
            "creditBal" : 600.0		
        },
        {
            "vendorId": "T1",
            "vednorName" : "Target"
        },
        {
            "vendorId": "W1",
            "vendorName" : "Walmart",
            "creditBal" : 12.25
        },
        {
            "vendorId": "G1",
            "creditBal" : 0.0		
        }
    ]
}

module.exports = {config, invoiceList, vendorList}