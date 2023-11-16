import { Box, Grid, styled, Typography, InputBase, LinearProgress, Pagination } from '@mui/material';
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
import { Enviroment } from '../../../shared/enviroment';


const BoxTitle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
  marginTop: 25,
  marginLeft: 10,
  marginRight: 10 
  }
}));

const TypographyHistoric = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
  display: 'none',
  },
}));


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
  width: '320px'},
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
  const [ isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);
 
  useEffect(() => {

    setIsLoading(true);
    
    debounce(() => {
      ViagensService.getAll(pagina, busca)
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message)
        } else {
          console.log(result)

          setTotalCount(result.totalCount)
          setCard(result.data)
        }
      }); 
      console.log('Card após atualização:', card);
    });
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, busca]);


  
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
        onChange={e => setSearchParams({ busca: e.target.value, pagina: '1' }, {replace: true})}
        />
      </SearchInput>
    
    </BoxTitle>

  {/* CARD DE VIAGENS MOBILE E WEB */}

  {card.length > 0 ? (

  <>
    {window.innerWidth <= 600 ? (

    <Grid sx={{ display: 'flex', flexDirection: 'column', margin: 2, gap: 2 }}>

    <Typography variant='subtitle2' color="text.secondary">Total: {totalCount}</Typography>
        
    {card.map((viagem) => (

      <CardMobile key={viagem.id} viagem={viagem} />

    ))}

    </Grid>

    ) : (

  <>
    <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4, marginLeft: 12, marginBottom: 4 }}>
      <Typography variant='subtitle2' color="text.secondary"> Total: {totalCount} </Typography>
      {card.map((viagem) => (
      <CardViagem key={viagem.id} viagem={viagem} />
       ))}
    </Grid>
  </>

   )}
  </>

  ) : (

  <Typography sx={{ textAlign: 'center'}} variant="body2">{Enviroment.LISTAGEM_VAZIA}</Typography>

)}

  <footer>
    {isLoading && (
      <LinearProgress variant='indeterminate'/>
    )}
    
    {(totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS) && (
      <Pagination sx={{ mx: 'auto', width: 200, marginBottom: 1 }} 
      count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
      page={pagina}
      onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true}) }
      />
    )}
  </footer>


</Box>


)}