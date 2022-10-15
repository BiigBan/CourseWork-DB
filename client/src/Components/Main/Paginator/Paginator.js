import { Pagination, Stack } from '@mui/material'
import { Box } from '@mui/system';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Context } from '../../../Context';

export default function Paginator({ setCurrentPage, allArticles }) {

    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(Math.floor(allArticles / 6))
    }, [])

    const pageClicked = (e) => {
        setCurrentPage(e.target.textContent)
    }


    const smallPhone = useContext(Context);
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0 30px 0' }}>
            <Stack spacing={2}>
                {!smallPhone ?
                    <Pagination onChange={pageClicked} count={count} /> :
                    <Pagination size='small' onChange={pageClicked} count={count} />
                }
            </Stack>
        </Box>
    )

}
