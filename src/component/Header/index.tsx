import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
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
    Assignment
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/global-context';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: '400px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '150px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        [theme.breakpoints.down('md')]: {
            width: '15ch',
        },
        [theme.breakpoints.down('sm')]: {
            width: '12ch',
        },
    },
}));

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

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
}));

const MobileSearchButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
}));

export default function Header() {
    const router = useRouter();
    const { state } = useGlobalContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [listMenuAnchorEl, setListMenuAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isListMenuOpen = Boolean(listMenuAnchorEl);

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
            <MenuItem onClick={() => { handleNavigation('/messages'); handleMenuClose(); }}>
                <ListItemIcon>
                    <Message fontSize="small" />
                </ListItemIcon>
                <ListItemText>Messages</ListItemText>
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

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#1976d2',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                <Toolbar>
                    {/* Mobile Menu Button */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMobileDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <More />
                    </IconButton>

                    {/* Logo */}
                    <Logo onClick={() => handleNavigation('/')}>
                        FlatShare
                    </Logo>

                    {/* Navigation Buttons - Desktop Only */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                        <NavButton
                            startIcon={<Home />}
                            onClick={() => handleNavigation('/')}
                        >
                            Home
                        </NavButton>
                        <NavButton
                            startIcon={<Apartment />}
                            onClick={() => handleNavigation('/properties')}
                        >
                            Properties
                        </NavButton>
                        <NavButton
                            startIcon={<Add />}
                            endIcon={<KeyboardArrowDown />}
                            onClick={handleListMenuOpen}
                            sx={{
                                backgroundColor: alpha('#fff', 0.1),
                                '&:hover': {
                                    backgroundColor: alpha('#fff', 0.2),
                                },
                            }}
                        >
                            List
                        </NavButton>
                    </Box>

                    {/* Search Bar - Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <SearchWrapper>
                            <SearchIconWrapper>
                                <Search />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search properties, locations..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </SearchWrapper>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right Side Icons - Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => handleNavigation('/connections')}
                        >
                            <Badge badgeContent={2} color="error">
                                <Favorite />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => handleNavigation('/messages')}
                        >
                            <Badge badgeContent={3} color="error">
                                <Message />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => handleNavigation('/notifications')}
                        >
                            <Badge badgeContent={5} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton
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
                        </IconButton>
                    </Box>

                    {/* Mobile Right Side Icons */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                        <MobileSearchButton
                            size="large"
                            onClick={handleSearchToggle}
                        >
                            <Search />
                        </MobileSearchButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            {state?.userData?.profileImage ? (
                                <Avatar
                                    src={state.userData.profileImage}
                                    sx={{ width: 28, height: 28 }}
                                />
                            ) : (
                                <AccountCircle />
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* Mobile Search Bar - Expandable */}
                <Collapse in={searchOpen}>
                    <Box sx={{ p: 2, backgroundColor: alpha('#1976d2', 0.95) }}>
                        <SearchWrapper sx={{ maxWidth: '100%', margin: 0 }}>
                            <SearchIconWrapper>
                                <Search />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search properties, locations..."
                                inputProps={{ 'aria-label': 'search' }}
                                autoFocus
                            />
                        </SearchWrapper>
                    </Box>
                </Collapse>
            </AppBar>

            {/* List Options Dropdown Menu */}
            <Popper
                open={isListMenuOpen}
                anchorEl={listMenuAnchorEl}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper sx={{ mt: 1, minWidth: 200 }}>
                            <ClickAwayListener onClickAway={handleListMenuClose}>
                                <Menu
                                    anchorEl={listMenuAnchorEl}
                                    open={isListMenuOpen}
                                    onClose={handleListMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={() => handleNavigation('/list-property/list-property')}>
                                        <ListItemIcon>
                                            <Business fontSize="small" />
                                        </ListItemIcon>
                                        List Property
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation('/list-property/list-requirement')}>
                                        <ListItemIcon>
                                            <Assignment fontSize="small" />
                                        </ListItemIcon>
                                        List Requirement
                                    </MenuItem>
                                </Menu>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            {/* Mobile Drawer */}
            {renderMobileDrawer}

            {/* Desktop Menu */}
            {renderMenu}

            {/* Mobile Floating Action Button for List Property */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
                <Fab
                    color="primary"
                    aria-label="list options"
                    onClick={handleListMenuOpen}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Add />
                </Fab>
            </Box>

            {/* Mobile List Options Dropdown */}
            <Popper
                open={isListMenuOpen && isMobile}
                anchorEl={listMenuAnchorEl}
                placement="top-end"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'top-end' ? 'right bottom' : 'right top',
                        }}
                    >
                        <Paper sx={{ mb: 1, minWidth: 200 }}>
                            <ClickAwayListener onClickAway={handleListMenuClose}>
                                <Menu
                                    anchorEl={listMenuAnchorEl}
                                    open={isListMenuOpen && isMobile}
                                    onClose={handleListMenuClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={() => handleNavigation('/list-property')}>
                                        <ListItemIcon>
                                            <Business fontSize="small" />
                                        </ListItemIcon>
                                        List Property
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation('/list-requirement')}>
                                        <ListItemIcon>
                                            <Assignment fontSize="small" />
                                        </ListItemIcon>
                                        List Requirement
                                    </MenuItem>
                                </Menu>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
