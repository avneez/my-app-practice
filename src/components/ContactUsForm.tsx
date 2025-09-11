import React, { useEffect, useRef, useState } from 'react';
import {
    Select,
    Box,
    TextField,
    MenuItem,
    Button,
    InputLabel,
    CircularProgress,
    Grid
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { useRunEngine } from '../../blocks/utilities/src/hooks/useRunEngine';
import MessageEnum, { getName } from '../../framework/src/Messages/MessageEnum';
import { Message } from '../../framework/src/Message';
import { toast } from 'react-toastify';

interface Props {
    handleCloseDialog:any;
}

const InputError = ({ errors, name }: any) => {
    if (errors[name]) {
        return <p className='error' style={{
            color: "#d90000",
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: 500,
            marginBottom: "5px"
        }}
        >
            {errors[name]}
        </p>
    } else {
        return null;
    }
}

const ContactusForm: React.FC<Props> = ({handleCloseDialog}) => {

    const [isLoading, setLoading] = useState(false)
    const [categories, setCategories]: any = useState([])

    const initialValues = {
        email: '',
        name: '',
        mobile_number: '',
        description: '',
        support_category_id: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        name: Yup.string().required('Name is required'),
        mobile_number: Yup.string().matches(/^\d{11,17}$/, 'Mobile Number must be between 7 to 15 digits.').required("Please enter mobile number"),
        description: Yup.string().required('Description is required'),
        support_category_id: Yup.string().required('Support category is required'),
    });

    const {
        sendNetworkRequest,
        setReceiveCallback,
    } = useRunEngine();

    const getSupportCategoriesCallId = useRef("")
    const getSubmitFormApiCallId = useRef("")

    useEffect(() => {
        setReceiveCallback(receive);
        getSupportCategories()
    }, []);

    const getSupportCategories = async () => {
        const headers = {
            token: null,
            "Content-Type": "application/json",
        };
        sendNetworkRequest(
            getSupportCategoriesCallId,
            "GET",
            'bx_block_categories/support_categories/get_support_category',
            headers
        );
    }

    const receive = async (from: string, message: Message) => {
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        const responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        if (apiRequestCallId === getSupportCategoriesCallId.current) {
            if (Array.isArray(responseJson)) {
                setCategories(responseJson);
            } else {
                setCategories([]);
            }
        }
        if (apiRequestCallId === getSubmitFormApiCallId.current) {
            responseJson?.data && toast.success("Form submitted successfully !")
        }
    };

    const contactFormSubmit = async (value: any) => {
        setLoading(true)
        const dataObject = {
            data: {
                email: value.email,
                name: value.name,
                mobile_number: value.mobile_number,
                description: value.description,
                support_category_id: value.support_category_id,
            }
        };
        const header = {
            token: null,
            "Content-Type": "application/json",
        };
        sendNetworkRequest(
            getSubmitFormApiCallId,
            "POST",
            'bx_block_contact_us/contacts/contact_help',
            header,
            dataObject
        )
        setLoading(false)
        handleCloseDialog(false)
    };

    return (<>
        <div style={classes.formContainerTop}>
        <style>
            {`
                .MuiFormLabel-root{
                    font-weight:700 !important;
                }
            `}
        </style>
        {/* <Box py={4}
            style={{ textAlign: "center" }}>
            <img style={classes.logo_img1} src={logo} alt="logo"/>
        </Box> */}
            <div style={classes.formContainer}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        contactFormSubmit(values);
                        resetForm();
                    }}
                >
                    {({ setFieldValue, values, errors }) => (
                        <Form translate={undefined} style={classes.form as React.CSSProperties}>
                            <Box style={classes.headerBox as React.CSSProperties}>
                                <h6>Contact Us</h6>
                            </Box>
                            <div style={classes.maincontainer}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    label="Email"
                                    placeholder="Enter your email"
                                    InputProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 400,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 700,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                    fullWidth
                                />
                                <InputError errors={errors} name="email" classes={undefined} />

                                <Field
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    placeholder="Enter your name"
                                    InputProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 400,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 700,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                    fullWidth
                                />
                                <InputError errors={errors} name="name" classes={undefined} />

                                <InputLabel style={classes.inputlable}>Mobile Number</InputLabel>
                                <Box style={classes.verifyInputandBtnConatiner}>
                                    <PhoneInput
                                        inputProps={{
                                            name: 'mobile_number',
                                            required: true,
                                        }}
                                        value={values.mobile_number}
                                        country="in"
                                        onChange={(value) => setFieldValue('mobile_number', value)}
                                        inputStyle={classes.phoneInputStyle}
                                        placeholder="Enter your phone number"
                                    />
                                </Box>
                                <InputError errors={errors} name="mobile_number" />

                                <Field
                                    name="description"
                                    type="text"
                                    as={TextField}
                                    label="Description"
                                    placeholder="Enter description"
                                    InputProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 400,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 700,
                                          fontFamily: 'Inter',
                                          color: '#8083a3',
                                        },
                                      }}
                                    fullWidth
                                />
                                <InputError errors={errors} name="description" />

                                <InputLabel id="support-category-id-label" style={classes.inputlable}>
                                    Support Category ID
                                </InputLabel>
                                <Select
                                    labelId="support-category-id-label"
                                    id="support-category-id"
                                    name="support_category_id"
                                    value={values.support_category_id}
                                    onChange={(e) => setFieldValue('support_category_id', e.target.value)}
                                    fullWidth
                                    style={classes.inputField3}
                                >
                                    {categories.length === 0 && <MenuItem>No category</MenuItem>}
                                    {categories?.map((item: any) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item?.category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <InputError errors={errors} name="support_category_id" />
                            </div>

                            <Button
                                style={classes.saveButton}
                                type="submit"
                            >
                                {isLoading ? <CircularProgress size={20} /> : "Submit"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </>
    );
}
export default ContactusForm;

// Styles
const classes:any = {
    logo_img1: {
        height: "35px",
        width: "145.15px",
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth:"400px",
        // maxHeight: "515px",
        // height: "100%",
    },
    formContainerTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
        width: "100%",
        "@media only screen and (max-width: 400px)": {
            maxWidth: '300px',
        }
    },
    headerBox: {
        textAlign: 'center',
        padding: '30px',
        borderBottom: '1px solid #E4E6E8',
        borderRadius: '14px 14px 0 0',
        color: '#f2f2f2',
        backgroundColor: "#00A7A2"
    },
    maincontainer: {
        padding: '20px'
    },
    verifyInputandBtnConatiner: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        maxWidth: 700,
        marginBottom: "10px"
    },
    phoneInputStyle: {
        width: '100%',
        border: "none",
        borderRadius: "0px",
        borderBottom: "1px solid #8083A3",
        font: "inherit",
        color: '#8083a3',
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "14px",
    },
    inputlable: {
        color: '#8083a3',
        fontFamily: "Inter",
        fontWeight: "700 !important",
        fontSize: "14px",
        font: "inherit",
        padding: "6px 0 7px",
        margin: 0,
        height: '1.1876em',
    },
    saveButton: {
        minWidth: '140px',
        borderRadius: '24px',
        background: "#00A7A2",
        padding: '9px 30px',
        color: '#FFFFFF',
        fontSize: '14px',
        margin: '0 15px',
        textTransform: 'none' as const,
        outline: 'none',
        backgroundColor: '#00A7A2'
    },
    error: {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: '12px',
        color: '#d90000',
        marginBottom: "5px"
    },
    inputField3: {
        fontWeight: "700 !important",
        fontSize: "14px",
        fontFamily: "Inter",
        color: "#8083a3",
        '& .MuiInputLabel': {
            color: '#8083a3',
            fontFamily: "Inter",
            fontWeight: "700 !important",
            fontSize: "14px",
        },
        "&::placeholder": {
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "14px",
            color: "#8083a3",
        },
        '& .MuiInputLabel-animated': {
            fontWeight: 700,
            color: '#8083a3',
            fontFamily: "Inter",
            fontSize: "14px",
        },
        marginBottom: "10px",
        '& .MuiInputBase-input': {
            padding: "6px 0 6px !important",
            color: '#8083a3',
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "14px",
        },
        '& MuiInput-underline .MuiInput-underline:after': {
            border: 'none'
        },
    },
};