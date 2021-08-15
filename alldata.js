function AllData() {
    const ctx = React.useContext(UserContext);
    const logCtx = React.useContext(LogContext)
    const [show, setShow] = React.useState(true);

    //only print logs if there is previous operations.
    if (logCtx.length === 0 && show) setShow(false)
    
    return (
        <Card 
        bgcolor="secondary"
        header="All data"
        body={show ? ( 
            <>
                {/*Every former operations */}
                <div className="alldata-operation">Operations</div><br/>
                <h1>{logCtx.map((item, index) => {
                    return <>
                        <li key={`list${index}`} id={`logs`}>{`User: ${item.identification} - Operation: ${item.operation} - Result: ${item.result}`}</li>
                    </>
                })}</h1>
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