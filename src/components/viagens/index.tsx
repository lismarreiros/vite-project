import { Box, Grid, Button, styled, Typography, InputBase } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Search } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { ViagensService, IListagemViagem } from '../../../services/api/viagens/ViagensService';
import { useDebounce } from '../../../shared/hooks/UseDebounce';
import CardMobile from './CardMobile';
import CardViagem from './CardViagem';
import { NavBar } from '../layouts/Navbar';


const BoxTitle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
  marginTop: 25,
  marginLeft: 10,
  marginRight: 10 
  }
}));

const GridButtons = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
  display: 'none',
  },
}));

const TypographyHistoric = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
  display: 'none',
  },
}));


{/* BUTTON DOS MESES */}
const ButtonMonth = styled(Button)({
  color: '#7C7C8A',
  textAlign: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  '&:hover': {
  backgroundColor: '#CADCF8',
  color:'#0065FF',
  borderColor: '#0062cc',
   boxShadow: 'none',
  },
});

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

{/* BARRA DE PESQUISA */}
const SearchInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FBFBFB',
  '&:hover': {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
  marginLeft: theme.spacing(3),
  width: 'auto', 
  marginRight: theme.spacing(2),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
  width: '20ch'},
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
  color: '#7A7A7A'
}));

export default function Viagens() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce();

  const [card, setCard] = useState<IListagemViagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const[selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const handleMonthButtonClick = (month: string) => {
    if (selectedMonths.includes(month)) {
    setSelectedMonths(selectedMonths.filter((item) => item !== month));
    } else {
    setSelectedMonths([...selectedMonths, month]);
    }
  };

  const renderMonthButtons = (): JSX.Element[] => {
  return months.map((month) => (
    <ButtonMonth
     key={month}
     onClick={() => handleMonthButtonClick(month)}
     sx={{
     backgroundColor: selectedMonths.includes(month) ? '#CADCF8' : '#FFFFFF',
     color: selectedMonths.includes(month) ? '#0065FF' : '#7C7C8A',
     variant: 'contained',
     m: 1}}>
    {month.substr(0, 3).toUpperCase()}
    </ButtonMonth>
    ));
  };

  useEffect(() => {
    setIsLoading(true);
    
    debounce(() => {
      ViagensService.getAll(1, busca)
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message)
          return;
        } else {
          let filteredTrips = result.data
          if (selectedMonths.length > 0) {
            filteredTrips = filteredTrips.filter((trip) => 
            selectedMonths.includes(months[new Date(trip.dataIda).getMonth()])
            );
          }

          setCard(filteredTrips);
          setTotalCount(filteredTrips.length);
        }
      });  
    });
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  
  return (
  <Box sx={{ flexGrow: 1 }}>
  <NavBar />
  
  {/* HISTÓRICO (TÍTULO) E SEARCH INPUT */}
    <BoxTitle sx={{display:'flex', justifyContent: 'space-between', marginTop: 10, marginLeft: 12, marginRight: 5 }}>

      <TypographyHistoric variant="h5" sx={{color: '#3C3C3C', fontWeight: 500, }}>Histórico</TypographyHistoric>
      
      <SearchInput>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <StyledInputBase 
        placeholder= {busca}
        onChange={(e) => setSearchParams({ busca: e.target.value }, {replace: true})}
        />
      </SearchInput>
    
    </BoxTitle>

  {/* BOTÕES DE MESES -- FAZER A FILTRAGEM */}
  <GridButtons container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
    
    <Grid  sx={{ marginLeft: 12}} item xs={2} sm={4} md={4}>

      {renderMonthButtons()}
    
    </Grid>
  
  </GridButtons>

  {/* CARD DE VIAGENS MOBILE E WEB */}

  {window.innerWidth <=600 ? (
  
      <Grid sx={{display: 'flex', flexDirection: 'column', margin: 2, gap: 2}}>
  
        <Typography variant='subtitle2' color="text.secondary">Março de 2023</Typography>
    
        <CardMobile />

      </Grid>
    
    ) : (
    
      <Grid sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4, marginLeft: 12, marginBottom: 4}}>
        
        <Typography variant='subtitle1' color="text.secondary">Março de 2023</Typography>
      
        <CardViagem />
      
      </Grid>
    
    )}


</Box>

 );
}