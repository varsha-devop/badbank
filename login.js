function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // This useState will help us to know which user is connected
    const [user, setUser] = React.useState(null);
    const ctx = React.useContext(UserContext);
    const logCtx = React.useContext(LogContext)


    function validate(field, label) {

        // determine if field is an email or a password. 0 for email, 1 for password
        const dataType = field === email ? 0 : 1;      

        const data = (input) => {
            // in case of an email
            if (dataType === 0) { 
                const check = ctx.users.map((e) => e.email).indexOf(input)
                // print this message if the email isn't registered
                if (check === -1) {
                    setStatus(`This ${label} is incorrect`);
                    setTimeout(() => setStatus('', 3000));
                    return false 
                }
                // Otherwise, it returns the position of the email
                else {
                    return check
                }
            }
            if (dataType === 1) {
                const check = ctx.users.map((e) => e.password).indexOf(input);
                return check
            }
        }
        return data(field);    
    }

    function handleCreate() {

        let checkEmail = validate(email, 'email')
        let checkPassword = validate(password, 'password')
        // Check if the email and the password match in the first place. 
        //Then check that they are both in the ctx array.
        if (checkEmail === checkPassword && checkEmail !== -1 && 
            checkPassword !== -1) {
                ctx.users[checkEmail].isConnected = true;
                logCtx.push({identification: email, operation: 'Login', result: 'success'})
                console.log(logCtx)
                setShow(false)
                return
            }
        alert(`Your email or your password isn't correct`)
        return
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card 
        bgcolor="secondary"
        header="Login"
        status={status}
        body={show ? ( 
            <>
                {/* email form */}
                Email <br/>
                <input type="input" className="form-control" id="email" 
                placeholder="Enter email" value={email} 
                onChange={e => setEmail(e.currentTarget.value)} /> <br/>
                {/* Password form */}
                Password <br/>
                <input type="password" className="form-control" id="password" 
                placeholder="Enter password" value={password} 
                onChange={e => setPassword(e.currentTarget.value)} /> <br/> 
                {/* submission button */}
                <button type="submit" className="btn btn-light" onClick=
                {handleCreate}>Login</button>
            </>
            ):( 
            <> 
               <h5>You are connected</h5>
                {/* submission button */}
                <button type="submit" className="btn btn-light" onClick=
                {clearForm}>Login to another account</button>
            </>
            )}
    />
    )
}