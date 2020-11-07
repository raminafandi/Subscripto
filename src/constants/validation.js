const validation = {
    'name': {
        presence: {
            message: 'Please enter a name'
        },
        other: {
            message: 'Please enter a valid name'
        }
    },

    'amount': {
        presence: {
            message: 'Please enter an amount'
        },
        other: {
            message: 'Please enter a valid amount'
        }
    },

    'date': {
        presence: {
            message: 'Please enter a billing date'
        },
        other: {
            message: 'Please enter a valid billing date'
        }
    },

    'period': {
        presence: {
            message: 'Please enter a billing period'
        },
        other: {
            message: 'Please enter a valid billing'
        }
    }
}

export default validation