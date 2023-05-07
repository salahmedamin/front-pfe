import React, { useCallback, useEffect } from 'react';

// material-ui
import {
    Button, FormHelperText,
    Grid, IconButton,
    InputAdornment,
    InputLabel, OutlinedInput,
    Stack
} from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authService } from '../../../services/auth.service';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const {logged} = useSelector(s=>s.auth)
    const nav = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const  login = useCallback(async({ trigramme, password })=>{
        const data = await authService.login({ password, trigramme })
        if(!data) throw new Error("Invalid credentials")
    },[])

    useEffect(() => {
        if(!logged) return;
        nav("/")
    }, [logged, nav]);


    return (
        <>
            <Formik
                initialValues={{
                    trigramme: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    trigramme: Yup.string().min(3).max(50).required('Trigramme is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await login(values)
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="trigramme-login">Trigramme</InputLabel>
                                    <OutlinedInput
                                        id="trigramme-login"
                                        type="trigramme"
                                        value={values.trigramme}
                                        name="trigramme"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter trigramme"
                                        fullWidth
                                        error={Boolean(touched.trigramme && errors.trigramme)}
                                    />
                                    {touched.trigramme && errors.trigramme && (
                                        <FormHelperText error id="standard-weight-helper-text-trigramme-login">
                                            {errors.trigramme}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
