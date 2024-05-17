import { Flex, Grid, HStack, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { LoadingSpinner } from '@app/components/loading-spinner';
import { Spinner } from '@app/ui/components/spinner';
import { RefreshIcon } from '@app/ui/icons/refresh-icon';

interface CollectiblesLayoutProps {
  title: string;
  isLoading: boolean;
  isLoadingMore?: boolean;
  onRefresh(): void;
  subHeader?: React.ReactNode;
  children: React.ReactNode;
}
export function CollectiblesLayout({
  title,
  isLoading,
  onRefresh,
  subHeader,
  isLoadingMore,
  children,
}: CollectiblesLayoutProps) {
  return (
    <>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" flex={1}>
        <HStack columnGap="space.02">
          <styled.span textStyle="label.01" paddingY="space.05">
            {title}
          </styled.span>
          {isLoading ? (
            <Spinner color={token('colors.ink.text-primary')} opacity={0.5} />
          ) : (
            <RefreshIcon cursor="pointer" onClick={() => onRefresh()} variant="small" />
          )}
        </HStack>
        {subHeader}
      </Flex>
      <Grid
        gridTemplateColumns={{
          base: 'repeat(auto-fill, minmax(156px, 1fr))',
          md: 'repeat(auto-fill, minmax(184px, 1fr))',
        }}
      >
        {children}
      </Grid>
      {isLoadingMore && <LoadingSpinner />}
    </>
  );
}
