import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            height
            width
            color
            fontSize
            bgcolor
            brcolor
            brradius
            brwidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $height: Int!,
        $width: Int!,
        $color: String!,
        $fontSize: Int!,
        $bgcolor: String!,
        $brcolor: String!,
        $brradius: Int!,
        $brwidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                height: $height,
                width: $width,
                color: $color,
                fontSize: $fontSize,
                bgcolor: $bgcolor,
                brcolor: $brcolor,
                brradius: $brradius,
                brwidth: $brwidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    render() {
        let text, height, width, color, fontSize, bgcolor, brcolor, brradius, brwidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/view/${data.logo._id}`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        <div className="panel-body"> 
                                        <h3 className="panel-title"  
                                            style = {{ height: data.logo.height, width: data.logo.width, color: data.logo.color, 
                                            fontSize: data.logo.fontSize, backgroundColor: data.logo.bgcolor, 
                                            borderStyle: "solid", borderColor: data.logo.brcolor,
                                            borderRadius: data.logo.brradius, borderWidth: data.logo.brwidth, 
                                            padding: data.logo.padding, margin: data.logo.padding }}> 
                                                {data.logo.text} 
                                        </h3>                                           
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, height: parseInt(height.value), width: parseInt(width.value), color: color.value, fontSize: parseInt(fontSize.value), 
                                                    bgcolor: bgcolor.value, brcolor: brcolor.value, brradius: parseInt(brradius.value), 
                                                    brwidth: parseInt(brwidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = "Draxx";
                                                color.value = "#000000";
                                                height.value = "20";
                                                width.value = "20";
                                                fontSize.value = "";
                                                bgcolor.value = "#000000";
                                                brcolor.value = "#000000";
                                                brradius.value = "15";
                                                brwidth.value = "15";
                                                padding.value = "15";
                                                margin.value = "15";
                                            }}>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="text" className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} placeholder="Height (px)" defaultValue={data.logo.height}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="text" className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} placeholder="Width (px)" defaultValue={data.logo.width} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="bgcolor">Backgroud Color:</label>
                                                    <input type="color" className="form-control" name="bgcolor" ref={node => {
                                                        bgcolor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.bgcolor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brcolor">Border Color:</label>
                                                    <input type="color" className="form-control" name="brcolor" ref={node => {
                                                        brcolor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.brcolor} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brradius">Border Radius:</label>
                                                    <input type="range" min="0" max="80" className="form-control" name="brradius" ref={node => {
                                                        brradius = node;
                                                    }} defaultValue={data.logo.brradius} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="brwidth">Border Width:</label>
                                                    <input type="range" min="5" max="80" className="form-control" name="brwidth" ref={node => {
                                                        brwidth = node;
                                                    }} defaultValue={data.logo.brwidth}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="range" min="0" max="50" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} defaultValue={data.logo.padding}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="range" min="0" max="50" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} defaultValue={data.logo.margin}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;