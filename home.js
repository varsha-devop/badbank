function Home(){
    return (
      <Card
        bgcolor="secondary"
        txtcolor="black"
        header="BadBank Home Page"
        title="Welcome to the Badbank"
        text="You can use our services using the navigation bar."
        body={(<img src="badbank.png" className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }