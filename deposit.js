function Deposit() {
    const ctx = React.useContext(UserContext);
    const logCtx = React.useContext(LogContext)

    const [show, setShow] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [user, setUser] = React.useState('');

    console.log(`show: ${show}`)
    console.log(`ctx: ${ctx.users.length}`)
    //define the user that is connected
    const findUser = () => {
        //Array used to stock information about the connected user
        const connectedUser = [];

        //variable used only to filter through the ctx.user global variable
        const checkUser = ctx.users.map((item, index) => {
            //seems to work only the first time it is used
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

    function handleDeposit() {

        if (amount < 0) {
            alert(`You can't depose a negative number`)
            return;
        }
        
        //Doesn't let the user depose a string
        if (isNaN(amount)) {
            alert(`You have to enter a number`)
            return;
        }

        let userIndex = user.index;

        //you need to update a copy first in order to use useState after and update user balance.
        let items = [{...user}];
        //parseFloat because amount is naturally a string
        items[0].balance = user.balance + parseFloat(amount)
        //update the general database
        ctx.users[userIndex] = items[0];
        //this variable will be pushed as the name in the logCtx global variable;
        const email = ctx.users[userIndex].email
        logCtx.push({identification: email, operation: 'Deposit', amount: amount, result: 'success'})
        alert(`Congratulation, you deposed $${amount} inside your bank account`)
        setUser(...items);
    }

    return (
        <Card 
        bgcolor="secondary"
        header="Deposit"
        body={show ? ( 
            <>
                {/* User balance */}
                Balance <br/>
                <h1>{user.balance}</h1>
                Deposit amount <br/>
                <input type="text" className="form-control" id="deposit" 
                placeholder="Enter amount" value={amount}
                onChange={e => setAmount(e.currentTarget.value)} /> <br/> 
                {/* submission button */}
                <button type="submit" className="btn btn-light" onClick=
                {handleDeposit} disabled={amount === 0}>Deposit</button>
            </>
            ):( 
            <> 
               <h5>first create account</h5><br/>
               <h5>Visit the login page </h5> 
            </>
            )}
    />
    )
}
