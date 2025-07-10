'use client'
import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Dialog, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Button,
    Avatar,
    Divider,
    ListItemIcon,
    ListItemText,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Collapse,
    Fab,
    ClickAwayListener,
    Grow,
    Paper,
    Popper
} from '@mui/material';
import {
    Search,
    AccountCircle,
    Notifications,
    More,
    Home,
    Apartment,
    Person,
    Settings,
    Logout,
    Add,
    Favorite,
    Message,
    Close,
    FilterList,
    LocationOn,
    KeyboardArrowDown,
    Business,
    Assignment,
    School
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/global-context';
import Link from 'next/link';
import SelectListingCard from '@/component/SelectListingCard';


const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.5rem',
    color: theme.palette.common.white,
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));


export default function Header() {
    const router = useRouter();
    const { state } = useGlobalContext();
    const isLoggedIn = state?.userData?.isLoggedIn;
    const userData = state?.userData;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [listMenuAnchorEl, setListMenuAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleListMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setListMenuAnchorEl(event.currentTarget);
    };

    const handleListMenuClose = () => {
        setListMenuAnchorEl(null);
    };

    const handleMobileDrawerToggle = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen);
    };

    const handleLogout = () => {
        handleMenuClose();
        setMobileDrawerOpen(false);
        router.push('/login');
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        setMobileDrawerOpen(false);
        setSearchOpen(false);
        handleListMenuClose();
    };

    const mobileMenuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Properties', icon: <Apartment />, path: '/properties' },
        { text: 'List Property', icon: <Business />, path: '/list-property', highlight: true },
        { text: 'List Requirement', icon: <Assignment />, path: '/list-requirement', highlight: true },
        { text: 'Favorites', icon: <Favorite />, path: '/connections', badge: 2 },
        { text: 'Messages', icon: <Message />, path: '/messages', badge: 3 },
        { text: 'Notifications', icon: <Notifications />, path: '/notifications', badge: 5 },
    ];

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
            <MenuItem onClick={() => { handleNavigation('/connections'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Favorite fontSize="small" />
                </ListItemIcon>
                <ListItemText>Favorites</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { handleNavigation('/connections'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Message fontSize="small" />
                </ListItemIcon>
                <ListItemText>Connections</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleNavigation('/settings'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );

    const renderMobileDrawer = (
        <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            PaperProps={{
                sx: {
                    width: 280,
                    backgroundColor: theme.palette.background.paper,
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Logo onClick={() => handleNavigation('/')}>
                        FlatShare
                    </Logo>
                    <IconButton onClick={handleMobileDrawerToggle}>
                        <Close />
                    </IconButton>
                </Box>

                {/* User Profile Section */}
                <Box sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    {state?.userData?.profileImage ? (
                        <Avatar
                            src={state.userData.profileImage}
                            sx={{ width: 48, height: 48 }}
                        />
                    ) : (
                        <Avatar sx={{ width: 48, height: 48 }}>
                            <AccountCircle />
                        </Avatar>
                    )}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {state?.userData?.firstName ? `${state.userData.firstName} ${state.userData.lastName}` : 'Welcome'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {state?.userData?.email || 'Sign in to continue'}
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation Items */}
                <List>
                    {mobileMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: 1,
                                    mb: 0.5,
                                    ...(item.highlight && {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                        },
                                    }),
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: item.highlight ? theme.palette.primary.main : 'inherit',
                                    minWidth: 40
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                                {item.badge && (
                                    <Badge badgeContent={item.badge} color="error" />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Quick Actions */}
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                        Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FilterList />}
                            onClick={() => handleNavigation('/filters')}
                        >
                            Filters
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LocationOn />}
                            onClick={() => handleNavigation('/nearby')}
                        >
                            Nearby
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );

    const [isListingModalOpen, setIsListingModalOpen] = React.useState(false);

    const RenderListingModal = () => {
        const modalOptions = [
            {
                title: "Add Property",
                description: "Add a new property or location for your listing",
                icon: <Home sx={{ fontSize: 32 }} />,
                route: "/list-property/list-property",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            },
            {
                title: "Add Requirement",
                description: "Define requirements and prerequisites for your property",
                icon: <Assignment sx={{ fontSize: 32 }} />,
                route: "/list-property/list-requirement",
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
                        variant="h6"
                        color="text.secondary"
                        textAlign="center"
                        mb={5}
                        fontWeight={400}
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
            <header className="fixed top-0 w-full bg-white shadow-md z-50 animate-slideDown">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div
                            className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform"
                            onClick={() => handleNavigation('/')}
                        >
                            <h1 className="text-3xl font-bold text-purple-600">
                                Learn<span className="text-green-500">Mate</span>
                            </h1>
                            <span className="text-sm">📚</span>
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
// <>
//     <AppBar
//         position="static"
//         sx={{
//             backgroundColor: '#1976d2',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//         }}
//     >
//         <Toolbar>
//             {/* Mobile Menu Button */}
//             <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={handleMobileDrawerToggle}
//                 sx={{ mr: 2, display: { md: 'none' } }}
//             >
//                 <More />
//             </IconButton>

//             {/* Logo */}
//             <Logo onClick={() => handleNavigation('/')}>
//                 FlatShare
//             </Logo>

//             {/* Navigation Buttons - Desktop Only */}
//             <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
//                 <NavButton
//                     startIcon={<Home />}
//                     onClick={() => handleNavigation('/')}
//                 >
//                     Home
//                 </NavButton>
//                 <NavButton
//                     startIcon={<Apartment />}
//                     onClick={() => handleNavigation('/properties')}
//                 >
//                     Properties
//                 </NavButton>
//                 <NavButton
//                     startIcon={<Add />}
//                     onClick={() => handleNavigation('/list-property')}
//                     sx={{
//                         backgroundColor: alpha('#fff', 0.1),
//                         '&:hover': {
//                             backgroundColor: alpha('#fff', 0.2),
//                         },
//                     }}
//                 >
//                     List Property
//                 </NavButton>
//             </Box>

//             {/* Search Bar - Desktop */}
//             <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//                 <SearchWrapper>
//                     <SearchIconWrapper>
//                         <Search />
//                     </SearchIconWrapper>
//                     <StyledInputBase
//                         placeholder="Search properties, locations..."
//                         inputProps={{ 'aria-label': 'search' }}
//                     />
//                 </SearchWrapper>
//             </Box>

//             <Box sx={{ flexGrow: 1 }} />

//             {/* Right Side Icons - Desktop */}
//             <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
//                 <IconButton
//                     size="large"
//                     color="inherit"
//                     onClick={() => handleNavigation('/connections')}
//                 >
//                     <Badge badgeContent={2} color="error">
//                         <Favorite />
//                     </Badge>
//                 </IconButton>
//                 <IconButton
//                     size="large"
//                     color="inherit"
//                     onClick={() => handleNavigation('/messages')}
//                 >
//                     <Badge badgeContent={3} color="error">
//                         <Message />
//                     </Badge>
//                 </IconButton>
//                 <IconButton
//                     size="large"
//                     color="inherit"
//                     onClick={() => handleNavigation('/notifications')}
//                 >
//                     <Badge badgeContent={5} color="error">
//                         <Notifications />
//                     </Badge>
//                 </IconButton>
// <IconButton
//     size="large"
//     edge="end"
//     aria-label="account of current user"
//     aria-controls={menuId}
//     aria-haspopup="true"
//     onClick={handleProfileMenuOpen}
//     color="inherit"
//     sx={{ ml: 1 }}
// >
//     {state?.userData?.profileImage ? (
//         <Avatar
//             src={state.userData.profileImage}
//             sx={{ width: 32, height: 32 }}
//         />
//     ) : (
//         <AccountCircle />
//     )}
// </IconButton>
//             </Box>

//             {/* Mobile Right Side Icons */}
//             <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
//                 <MobileSearchButton
//                     size="large"
//                     onClick={handleSearchToggle}
//                 >
//                     <Search />
//                 </MobileSearchButton>
//                 <IconButton
//                     size="large"
//                     color="inherit"
//                     onClick={handleProfileMenuOpen}
//                 >
//                     {state?.userData?.profileImage ? (
//                         <Avatar
//                             src={state.userData.profileImage}
//                             sx={{ width: 28, height: 28 }}
//                         />
//                     ) : (
//                         <AccountCircle />
//                     )}
//                 </IconButton>
//             </Box>
//         </Toolbar>

//         {/* Mobile Search Bar - Expandable */}
//         <Collapse in={searchOpen}>
//             <Box sx={{ p: 2, backgroundColor: alpha('#1976d2', 0.95) }}>
//                 <SearchWrapper sx={{ maxWidth: '100%', margin: 0 }}>
//                     <SearchIconWrapper>
//                         <Search />
//                     </SearchIconWrapper>
//                     <StyledInputBase
//                         placeholder="Search properties, locations..."
//                         inputProps={{ 'aria-label': 'search' }}
//                         autoFocus
//                     />
//                 </SearchWrapper>
//             </Box>
//         </Collapse>
//     </AppBar>

//     {/* Mobile Drawer */}
//     {renderMobileDrawer}

//     {/* Desktop Menu */}
//     {renderMenu}

//     {/* Mobile Floating Action Button for List Property */}
//     <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
//         <Fab
//             color="primary"
//             aria-label="list property"
//             onClick={() => handleNavigation('/list-property')}
//             sx={{
//                 backgroundColor: theme.palette.primary.main,
//                 '&:hover': {
//                     backgroundColor: theme.palette.primary.dark,
//                 },
//             }}
//         >
//             <Add />
//         </Fab>
//     </Box>
// </>