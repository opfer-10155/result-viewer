import React, { SFC } from 'react';

/**
 *  ComponentにLayoutを適用
 */
export const withLayout: <P>(Layout: SFC) => (Cmp: SFC<P>) => SFC<P>
= Layout => Cmp => {
  return (props) => {
    return (
      <Layout>
        <Cmp {...props} />
      </Layout>
    )
  }
}

export default withLayout
