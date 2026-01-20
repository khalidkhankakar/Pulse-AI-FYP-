from typing import Literal
import pandas as pd
import numpy as np


def corelation_data(
        df: pd.DataFrame,
        output_var: str,
        method: Literal['pearson', 'spearman', 'kendall'] = 'pearson'
        ) -> pd.Series:
    
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")
    
    if output_var not in df.columns:
        raise ValueError(f"'{output_var}' not found in DataFrame columns")
    
    numeric_cols = df.select_dtypes(include='number').columns

    if output_var not in numeric_cols:
        raise ValueError(f"'{output_var}' must be a numerical column for correlation calculation")
    

    return df[numeric_cols].corr(method)[output_var].sort_values(ascending=False)