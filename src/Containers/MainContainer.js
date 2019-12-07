import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import NavbarComponent from "../Components/NavbarComponent";
import ImageComponent from "../Components/ImageComponent";
import BreedImageService from "../Services/BreedImageService";
import Col from "react-bootstrap/Col";

class MainContainer extends Component {
    constructor(props){
        super(props)
        //Get Instance of service to fetch data
        this.breedImageService = BreedImageService.getInstance()
        this.state= {
            //store all image url
            breedImage: [],
            //store breed name
            keyword: this.props.match.params.keyword === undefined ? 'pug': this.props.match.params.keyword,
            //store object of breed list fetched from api
            breeds:{},
            //store full breed list in array
            breedName:[]
        }
    }

    /**
     * Fetch default dog images and get all options of breed list for user to search from
     */
    componentDidMount() {
        this.findAllBreedImage();
        this.getAllBreed().then(res => this.generateBreedOptions());
    }

    /**
     *Fetch initial dog images when refresh
     * @returns {Promise<void>}
     */
    findAllBreedImage = () =>
        this.breedImageService.searchFunc(this.state.keyword).then(response =>this.setState({breedImage: response.message}));

    /**
     * Loading more Dog Pics.
     * Used by <InfiniteScroll>
     * @returns {Promise<any>}
     */
    loadFunc =()=>
        this.breedImageService.searchFunc(this.state.keyword)
            .then(response => {
                let morePics = response.message.filter((image)=> this.state.breedImage.includes(image) === false);
                this.setState({breedImage: [...this.state.breedImage, ...morePics]});
            });

    /**
     * Change keywords(breed) after users choose
     * @param e event: chosen value of breed
     */
    changeKeywords =(e)=>
        this.setState({
            keyword:e.target.value
        });

    /**
     * Get breed list from API
     * Create promise for asynchronous function call
     * @returns {Promise<unknown>}
     */
    getAllBreed = ()=> {
        return new Promise((resolve, reject) => {
                this.breedImageService.getAllBreed().then(res => {
                    if(res.status=="success"){
                        this.setState({breeds: res.message})
                        resolve("success")
                    }else{
                        reject("fail")
                    }
                })
        })
    }

    /**
     * Expand obtained breed list to array<String>
     */
    generateBreedOptions = () => {
        let x = [];
        for(let name in this.state.breeds){
            if(this.state.breeds[name].length!=0){
                for(let i=0;  i<this.state.breeds[name].length; i++){
                    x.push(name+ '/' + this.state.breeds[name][i]);
                }
            }else{
                 x.push(name);
            }
        }
        this.setState({breedName: x});
    }

    /**
     * Render <ImageComponent> and <NavbarComponent>
     * @returns {*}
     */
    render() {
        return (
            <Container fluid>
                {console.log(this.state.keyword)}
                <Row>
                    <Col>
                        <NavbarComponent breeds={this.state.breedName} keywords={this.state.keyword}
                                         Onchange={this.changeKeywords} search={this.findAllBreedImage}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    {this.state.breedImage.length!=0? <ImageComponent breedImage = {this.state.breedImage}
                        loadFunc={this.loadFunc}/>: 'Loading...'}
                    </Col>
                </Row>

            </Container>
        )

    }
}

export default MainContainer;
