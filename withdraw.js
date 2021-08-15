function Withdraw() {
    const ctx = React.useContext(UserContext);
    const logCtx = React.useContext(LogContext)

    const [show, setShow] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [user, setUser] = React.useState('');

    //define the user that is connected
    const findUser = () => {
        //Array used to stock information about the connected user
        const connectedUser = [];
        //variable used only to filter through the ctx.user global variable
        const checkUser = ctx.users.map((item, index) => {
            if (item.isConnected === true) {
                item.index = index;
                connectedUser.push(item);
            }
        })
        return connectedUser;  
    }

    //use setState to update the user
    if(user === '' && findUser().length === 1) {
        setUser(findUser()[0])
    }

    //is triggered only if a user is connected. It changes the status to isConnected === true
    if (user !== '' && show === false) {
        setShow(true);
    }

    function handleWithdrawal() {

        if (amount <= 0) {
            alert(`You can't withdraw $0 or a negative number`)
            return;
        }

        //Doesn't let the user depose a string
        if (isNaN(amount)) {
            alert(`You have to enter a number`)
            return;
        }

        if (amount > user.balance) {
            alert(`You don't have enought money`)
            return;
        }
        

        console.log(user.balance)
        console.log(user.isConnected)

        let userIndex = user.index;

        //you need to update a copy first in order to use useState after and update user balance.
        let items = [{...user}];
        //parseFloat because amount is naturally a string
        items[0].balance = user.balance - parseFloat(amount)
        //update the general database
        ctx.users[userIndex] = items[0];
        const email = ctx.users[userIndex].email
        logCtx.push({identification: email, operation: 'Withdraw', amount: amount, result: 'success'})
        alert(`congratulation, you withdraw $${amount} inside your bank account`)
        setUser(...items);
    }

    return (
        <Card 
        bgcolor="secondary"
        header="Withdrawal"
        body={show ? ( 
            <>
                {/* User balance */}
                Balance <br/>
                <h1>{user.balance}</h1>
                Withdraw amount <br/>
                <input type="text" className="form-control" id="withdraw" 
                placeholder="Enter amount" value={amount}
                onChange={e => setAmount(e.currentTarget.value)} /> <br/> 
                {/* submission button */}
                <button type="submit" className="btn btn-light" onClick=
                {handleWithdrawal} disabled={amount === 0 }>Withdraw</button>
            </>
            ):( 
            <> 
               <h5> first create account</h5><br/>
               <h5>Visit the login page</h5> 
            </>
            )}
    />
    )
}
