{
  /*Just some code deleted from the template that may or may not be useful*/
}

{
  /*How to create a usercard, with a profile image with text below*/
}
<Col md={4}>
  <UserCard
    bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
    avatar={avatar}
    name="Mike Andrew"
    userName="michael24"
    description={
      <span>
        "Lamborghini Mercy
        <br />
        Your chick she so thirsty
        <br />
        I'm in that two seat Lambo"
      </span>
    }
    socials={
      <div>
        <Button simple>
          <i className="fa fa-facebook-square" />
        </Button>
        <Button simple>
          <i className="fa fa-twitter" />
        </Button>
        <Button simple>
          <i className="fa fa-google-plus-square" />
        </Button>
      </div>
    }
  />
</Col>;


{
  /*How to create a form*/
}
<Col>
<Card
  title="Edit Profile"
  content={
  <form>
    <FormInputs
      ncols={["col-md-5", "col-md-3", "col-md-4"]}
      properties={[
        {
          label: "Company (disabled)",
          type: "text",
          bsClass: "form-control",
          placeholder: "Company",
          defaultValue: "Creative Code Inc.",
          disabled: true
        },
        {
          label: "Username",
          type: "text",
          bsClass: "form-control",
          placeholder: "Username",
          defaultValue: "michael23"
        },
        {
          label: "Email address",
          type: "email",
          bsClass: "form-control",
          placeholder: "Email"
        }
      ]}
    />
    <FormInputs
      ncols={["col-md-6", "col-md-6"]}
      properties={[
        {
          label: "First name",
          type: "text",
          bsClass: "form-control",
          placeholder: "First name",
          defaultValue: "Mike"
        },
        {
          label: "Last name",
          type: "text",
          bsClass: "form-control",
          placeholder: "Last name",
          defaultValue: "Andrew"
        }
      ]}
    />
    <FormInputs
      ncols={["col-md-12"]}
      properties={[
        {
          label: "Adress",
          type: "text",
          bsClass: "form-control",
          placeholder: "Home Adress",
          defaultValue:
            "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
        }
      ]}
    />
    <FormInputs
      ncols={["col-md-4", "col-md-4", "col-md-4"]}
      properties={[
        {
          label: "City",
          type: "text",
          bsClass: "form-control",
          placeholder: "City",
          defaultValue: "Mike"
        },
        {
          label: "Country",
          type: "text",
          bsClass: "form-control",
          placeholder: "Country",
          defaultValue: "Andrew"
        },
        {
          label: "Postal Code",
          type: "number",
          bsClass: "form-control",
          placeholder: "ZIP Code"
        }
      ]}
    />
    </Col>;

    <Row>
      <Col md={12}>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>About Me</ControlLabel>
          <FormControl
            rows="5"
            componentClass="textarea"
            bsClass="form-control"
            placeholder="Here can be your description"
            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
          />
        </FormGroup>
      </Col>
    </Row>
    <Button bsStyle="info" pullRight fill type="submit">
      Update Profile
    </Button>
    <div className="clearfix" />
  </form>
  }
/>



</*How to create submit button*/>
<Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>