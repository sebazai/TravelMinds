// components/IconPicker.js
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import {
    Home,
    Settings,
    Person,
    Search,
    Add,
    Edit,
    Delete,
    Close,
    Menu,
    ArrowBack,
    ArrowForward,
    Mail,
    Phone,
    Message,
    Notifications,
    Check,
    Error,
    Warning,
    Info,
    Star,
    Favorite,
    Upload,
    Download,
    Save,
    Print,
    Share,
    Folder,
    ShoppingCart,
    CreditCard,
    AttachMoney,
    Image,
    MusicNote,    
    Language,
    LocationOn,
    CalendarToday,
    AccessTime,
    Lock,
    Help
} from '@mui/icons-material';

const selectedIcons = {
    Home,
    Settings,
    Person,
    Search,
    Add,
    Edit,
    Delete,
    Close,
    Menu,
    ArrowBack,
    ArrowForward,
    Mail,
    Phone,
    Message,
    Notifications,
    Check,
    Error,
    Warning,
    Info,
    Star,
    Favorite,
    Upload,
    Download,
    Save,
    Print,
    Share,
    Folder,
    ShoppingCart,
    CreditCard,
    AttachMoney,
    Image,
    MusicNote,
    Language,
    LocationOn,
    CalendarToday,
    AccessTime,
    Lock,
    Help
};

export const IconPicker = ({ onChange, currentIcon }) => {
    const iconOptions = Object.keys(selectedIcons).map(iconName => ({
        label: iconName,
        value: iconName,
        icon: selectedIcons[iconName]
    }));

    return (
        <Autocomplete
            id="icon-select-demo"
            sx={{ width: '100%' }}
            options={iconOptions}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            autoHighlight
            value={iconOptions.find(option => option.value === currentIcon) || null}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
                const IconComponent = option.icon;
                const { key, ...otherProps } = props; 
                return (
                    <Box
                        component="li"
                        sx={{ 
                            '& > svg': { mr: 2, flexShrink: 0 },
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        key={key} 
                        {...otherProps} 
                    >
                        <IconComponent />
                        {option.label}
                    </Box>
                );
            }}
            
            renderInput={(params) => {
                const SelectedIcon = currentIcon ? selectedIcons[currentIcon] : null;
                return (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Select an Icon"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    {SelectedIcon && (
                                        <InputAdornment position="start">
                                            <SelectedIcon />
                                        </InputAdornment>
                                    )}
                                    {params.InputProps.startAdornment}
                                </>
                            )
                        }}
                    />
                );
            }}
            onChange={(event, newValue) => {
                onChange(newValue ? newValue.value : '');
            }}
            ListboxProps={{
                style: {
                    maxHeight: '300px'
                }
            }}
        />
    );
};