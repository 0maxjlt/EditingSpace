import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    CircularProgress,
    Stack,
} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { useTheme } from "@mui/material";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const theme = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulation appel API
        setTimeout(() => {
            setLoading(false);
            if (email !== "test@test.com" || password !== "password") {
                setError("Email ou mot de passe incorrect");
            } else {
                alert("Connexion réussie ✅");
            }
        }, 1500);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack
                sx={{
                    p: 4,
                    width: 380,
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={500}
                    textAlign="center"
                    mb={3}
                >
                    Connexion
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        slotProps={{ input: { style: { color: theme.palette.text.primary } } }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        required
                    />

                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            height: 48,
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Se connecter"}
                    </Button>
                </form>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={2}
                >
                    Mot de passe oublié ?
                </Typography>
            </Stack>
        </Box>
    );
};

export default Login;
