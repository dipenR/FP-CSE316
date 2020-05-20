import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
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
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    render() {
        let text, color, fontSize, bgcolor, brcolor, brradius, brwidth, padding, margin, height, width;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, height: parseInt(height.value), width: parseInt(width.value), color: color.value, fontSize: parseInt(fontSize.value), 
                                        bgcolor: bgcolor.value, brcolor: brcolor.value, brradius: parseInt(brradius.value), 
                                        brwidth: parseInt(brwidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    text.value = "Draxx";
                                    height.value = "20";
                                    width.value = "20";
                                    color.value = "#000000";
                                    fontSize.value = "12";
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
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="height">Height:</label>
                                        <input type="text" className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} placeholder="Height (px)" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="width">Width:</label>
                                        <input type="text" className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} placeholder="Width (px)" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bgcolor">Backgroud Color:</label>
                                        <input type="color" className="form-control" name="bgcolor" ref={node => {
                                            bgcolor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="brcolor">Border Color:</label>
                                        <input type="color" className="form-control" name="brcolor" ref={node => {
                                            brcolor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="brradius">Border Radius:</label>
                                        <input type="range" min="0" max="80" className="form-control" name="brradius" ref={node => {
                                            brradius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="brwidth">Border Width:</label>
                                        <input type="range" min="5" max="80" className="form-control" name="brwidth" ref={node => {
                                            brwidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="range" min="0" max="50" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="margin">Margin: </label>
                                        <input type="range" min="0" max="50" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
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
    }
}

export default CreateLogoScreen;