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

def separate_features_by_type(
        df:pd.DataFrame
)-> tuple[list[str], list[str]]:
    """
    Separate numerical and categorical features in the DataFrame.
    """
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")
    
    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    categorical_cols = df.select_dtypes(exclude='number').columns.tolist()
    
    return numeric_cols, categorical_cols