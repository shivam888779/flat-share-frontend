'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
    Box,
    IconButton,
    Typography,
    MenuItem,
    Menu,
    Button,
    Avatar,
    Divider,
    ListItemIcon,
    ListItemText,

} from '@mui/material';
import {
    AccountCircle,
    Home,
    Person,
    Settings,
    Logout,
    Favorite,
    Message,
    Close,
    Assignment,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/global-context';
import Link from 'next/link';
import SelectListingCard from '@/component/SelectListingCard';
import { IUserData } from '@/types/user';
import LogInModal from '../LogInModal';
import { logoutApi } from '@/api/auth';
import { useGlobalSnackbar } from '@/hooks/useSnackbar';



export default function Header() {
    const router = useRouter();
    const { state, setState, handleLoginDialog } = useGlobalContext();
    const snackbar = useGlobalSnackbar();
    const isLoggedIn = state?.userData?.isLoggedIn;
    const userData = state?.userData;


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = async () => {
        try {
            // const { data } = await logoutApi();
            // if (data.status) {
            // snackbar.success(data.message);
            snackbar.success("Logged out successfully");
            handleMenuClose();
            localStorage.clear();
            setState({ userData: { isLoggedIn: false } as IUserData });
            router.push('/');
            // }
        } catch (error) {
            console.log(error);
        } finally {
            handleMenuClose();
            localStorage.clear();
            setState({ userData: { isLoggedIn: false } as IUserData });
            router.push('/');
        }

    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                sx: {
                    minWidth: 200,

                    mt: 1,
                },
            }}
        >
            <MenuItem onClick={() => { handleNavigation('/my-profile'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
            </MenuItem>
            {userData?.requirementListed && <MenuItem onClick={() => { handleNavigation('/my-property'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Home fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Property</ListItemText>
            </MenuItem>}
            <MenuItem onClick={() => { handleNavigation('/chat'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Favorite fontSize="small" />
                </ListItemIcon>
                <ListItemText>Messages</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { handleNavigation('/connections'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Message fontSize="small" />
                </ListItemIcon>
                <ListItemText>Connections</ListItemText>
            </MenuItem>
            <Divider />
            {/* <MenuItem onClick={() => { handleNavigation('/settings'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );


    const [isListingModalOpen, setIsListingModalOpen] = React.useState(false);

    const RenderListingModal = () => {
        const modalOptions = [
            {
                title: "Add Property",
                description: "Add a new property or location for your listing",
                icon: <Home sx={{ fontSize: 32 }} />,
                route: "/add-listing/property",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            },
            {
                title: "Add Requirement",
                description: "Define requirements and prerequisites for your property",
                icon: <Assignment sx={{ fontSize: 32 }} />,
                route: "/add-listing/requirement",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            },

        ];

        return (
            <Dialog
                open={isListingModalOpen}
                onClose={() => setIsListingModalOpen(false)}
                maxWidth="md"
                fullWidth
                TransitionProps={{
                    style: {
                        transition: 'all 0.3s ease'
                    }
                }}
                PaperProps={{
                    elevation: 24,
                    sx: {
                        borderRadius: 3,
                        overflow: 'visible'
                    }
                }}

            >
                <DialogTitle
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 3,
                        px: 4
                    }}
                >
                    <Typography variant="h4" component="h2" fontWeight={600}>
                        Add New Listing
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setIsListingModalOpen(false)}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                                transform: 'rotate(90deg)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        color="text.primary"
                        textAlign="center"
                        my={3}
                    // fontWeight={400}
                    >
                        Choose what you want to add to your listing
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(2, 1fr)'
                            },
                            gap: 3,
                        }}
                    >
                        {modalOptions.map((option, index) => (
                            <SelectListingCard
                                key={index}
                                handleDialogOpen={() => setIsListingModalOpen(!isListingModalOpen)}
                                image="https://mui.com/static/images/cards/paella.jpg"
                                {...option}
                            />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 5,
                            pt: 3,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Need help getting started?{' '}
                            <Box
                                component="a"
                                href="#"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                View our guide
                            </Box>
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    };


    return (
        <>
            <LogInModal open={state.openLoginDialog} onClose={() => handleLoginDialog(false)} />
            <header className="fixed top-0 w-full  bg-white shadow-md z-50 animate-slideDown">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16  items-center py-2">
                        <div
                            className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform"
                            onClick={() => handleNavigation('/')}
                        >
                            <h1 className="text-3xl font-bold text-purple-600">
                                Flat<span className="text-green-500">Share</span>
                            </h1>
                            {/* <span className="text-sm">🏠</span> */}
                        </div>

                        <div className="flex gap-3">
                            {!isLoggedIn && <Link
                                href="/login"
                                className="text-gray-600 hover:text-purple-600 normal-case"
                            >
                                Login / Register
                            </Link>}
                            {!userData?.requirementListed && userData?.firstName && <Button
                                variant="contained"
                                className="normal-case"
                                sx={{
                                    backgroundColor: '#ffeaa7',
                                    color: '#2d3436',
                                    borderRadius: '25px',
                                    px: 3,
                                    boxShadow: '0 4px 15px rgba(255, 234, 167, 0.4)',
                                    '&:hover': {
                                        backgroundColor: '#fdcb6e',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(255, 234, 167, 0.6)'
                                    }
                                }}
                                onClick={() => setIsListingModalOpen(true)}
                            >
                                Add Listing
                            </Button>}
                            {isLoggedIn && <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                sx={{ ml: 1 }}
                            >
                                {state?.userData?.profileImage ? (
                                    <Avatar
                                        src={state.userData.profileImage}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                ) : (
                                    <AccountCircle />
                                )}
                            </IconButton>}
                            {renderMenu}
                        </div>
                    </div>
                </div>
            </header>
            <RenderListingModal />
        </>
    );
}
