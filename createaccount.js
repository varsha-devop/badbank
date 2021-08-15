function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [activate, setActivate] = React.useState(true);
    
    const ctx = React.useContext(UserContext);
    const logCtx = React.useContext(LogContext)

    function validate(field, label) {
        //if will return false if any field is left blank
        if (!field) { 
            setTimeout(() => {})  
            alert(`Error ${label}`)
            setActivate(false); 
            setStatus('Error' + label);
            setTimeout(() => setStatus('', 3000))
            return false
        };
        //if the email doesn't include a '@' and a '.', it will return false
        if (field === email && (!field.includes('@') || !field.includes('.'))) {
            alert(`Enter a proper ${label}`)
            setStatus('Error' + label);
            setTimeout(() => setStatus('', 3000))
            return false    
        };
        //If the password is too short, it will return false
        if (field === password && field.length < 8) {
            alert(`Error ${label}. Your password must include at least 8 characters`)
            setStatus('Error' + label);
            setTimeout(() => setStatus('', 3000))
            return false    
        }
        return true
    }

    function handleCreate() {
        if(!validate(name, 'name')) return;
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;
        ctx.users.push({name, email, password, balance:100});
        logCtx.push({identification: email, operation: 'Create Account', result: 'success'})
        console.log(logCtx)
        setShow(false)
    }  

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card
            bgcolor="secondary"
            header="Create Account"
            status={status}
            body={show ? ( 
                <>
                    {/* Name form */}
                    Name <br/>
                    <input type="input" className="form-control" id="name" 
                    placeholder="Enter name" value={name} 
                    onChange={e => setName(e.currentTarget.value)} /> <br/>
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
                    {/* the button is activated only if all the fields are filed */}
                    <button type="submit" className="btn btn-light" onClick=
                    {handleCreate} disabled={!name || !email || !password}>Create Account</button>
                </>
                ):( 
                <> 
                   <h5>Success</h5>
                    {/* submission button */}
                    <button type="submit" className="btn btn-light" onClick=
                    {clearForm}>Add another account</button>
                </>
                )}
        />
    )
}